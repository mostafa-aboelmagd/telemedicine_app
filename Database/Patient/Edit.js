const pg = require('pg');
const bcrypt = require('bcrypt');
require('dotenv').config();
const saltRounds = 10;


const { PGHOST, PGDATABASE, PGUSER, PGPORT } = process.env;
let PGPASSWORD = process.env.PGPASSWORD;
PGPASSWORD = decodeURIComponent(PGPASSWORD);

const pool = new pg.Pool({
    user: PGUSER,
    host: PGHOST,
    database: PGDATABASE,
    password: PGPASSWORD,
    port: PGPORT,
    ssl: {
        rejectUnauthorized: true,
    },
});

(async () => {
    try {
        const client = await pool.connect();
        console.log('Connected to the database');
        client.release();
    } catch (error) {
        console.error('Database connection error', error.stack);
    }
})();

const checkUserEmail = async (email) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE user_email = $1 AND user_role = $2', [email, 'Patient']);
        if (result.rows.length) {
            console.log('User already exists', result.rows);
            return result.rows;
        }
        console.log('No user found');
        return false;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const updateInfo = async (patientId, patientEmail, updates) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const userFields = [];
        const userValues = [];
        let userIndex = 1;

        for (const [key, value] of Object.entries(updates)) {
            if (value !== undefined && value !== null && value !== '') {
                if (key !== 'languages') {
                    userFields.push(`${key} = $${userIndex}`);
                    userValues.push(value);
                    userIndex++;
                }
            }
        }

        if (userFields.length > 0) {
            userValues.push(patientId, 'Patient', patientEmail);
            const userQuery = `UPDATE users SET ${userFields.join(', ')} WHERE user_id = $${userIndex} AND user_role = $${userIndex + 1} AND user_email = $${userIndex + 2} RETURNING *`;
            const updatedUserInfo = await client.query(userQuery, userValues);
            console.log('User info updated', updatedUserInfo.rows);
        }

        if (updates.languages.length > 0) {
            if(updates.languages[0] !== null && updates.languages[0] !== undefined && updates.languages[0] !== '') {
                await client.query('DELETE FROM languages WHERE lang_user_id = $1', [patientId]);
                for (const language of updates.languages) {
                    if(language !== '' && language !== null && language !== undefined){
                        await client.query('INSERT INTO languages (lang_user_id, language) VALUES ($1, $2)', [patientId, language]);
                        console.log('Languages updated', language);
                    }
                }
            }
        }

        const combinedQuery = `
            SELECT 
                u.user_id, u.user_first_name, u.user_last_name, u.user_email, u.user_gender, u.user_phone_number, u.user_birth_year,
                array_agg(l.language) AS languages
            FROM 
                users u
            LEFT JOIN 
                languages l ON u.user_id = l.lang_user_id
            WHERE 
                u.user_id = $1 AND u.user_role = $2 AND u.user_email = $3
            GROUP BY 
                u.user_id, u.user_first_name, u.user_last_name, u.user_email, u.user_gender, u.user_phone_number, u.user_birth_year
        `;
        const combinedResult = await client.query(combinedQuery, [patientId, 'Patient', patientEmail]);

        await client.query('COMMIT');
        return combinedResult.rows;
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error updating patient info:', error.stack);
        return false;
    } finally {
        client.release();
    }
};

const updatePassword = async (patientId, patientEmail, oldPassword, newPassword) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE user_id = $1 AND user_role = $2 AND user_email = $3', [patientId, 'Patient', patientEmail]);
        if (result.rows.length) {
            const isMatch = await bcrypt.compare(oldPassword, result.rows[0].user_password_hash);
            if (isMatch) {
                const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
                const result = await pool.query('UPDATE users SET user_password_hash = $1 WHERE user_id = $2 AND user_role = $3 AND user_email = $4 RETURNING *', [hashedPassword, patientId, 'Patient', patientEmail]);
                if (result.rows.length) {
                    console.log('Patient password updated', result.rows);
                    return result.rows;
                }
                console.log('Could not update patient password');
                return false;
            }
            console.log('Old password does not match');
            return false;
        }
        console.log('Patient not found');
        return false;
    }
    catch (error) {
        console.error(error.stack);
        return false;
    }
};

module.exports = { updateInfo, updatePassword, checkUserEmail };

