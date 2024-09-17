import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:tele_med_pilot/core/constant.dart';
import 'package:tele_med_pilot/core/route.dart';
import 'package:tele_med_pilot/core/theme.dart';
import 'package:tele_med_pilot/ui/components/app_bar.dart';
import 'package:tele_med_pilot/ui/components/button.dart';

class DoctorProfileScreen extends ConsumerStatefulWidget {
  const DoctorProfileScreen({super.key});

  @override
  ConsumerState<ConsumerStatefulWidget> createState() =>
      _DoctorProfileScreenState();
}

class _DoctorProfileScreenState extends ConsumerState<DoctorProfileScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.gray10,
      appBar: const CustomAppBar(identifier: 2),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              SizedBox(height: 12.h),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisSize: MainAxisSize.max,
                children: [
                  IconButton(
                    icon:
                        Icon(Icons.arrow_circle_left_outlined, size: 35.spMin),
                    onPressed: () {
                      Navigator.pop(context);
                    },
                  ),
                  Text(
                    "Doctor Profile",
                    style: AppTextStyles.bodyTextExtraLargeBold
                        .copyWith(color: AppColors.blue100),
                  ),
                  SizedBox(width: 48.w),
                ],
              ),
              SizedBox(height: 10.h),
              Container(
                width: double.infinity,
                margin: EdgeInsets.all(8.r),
                padding: EdgeInsets.all(16.r),
                decoration: BoxDecoration(
                  color: AppColors.white,
                  borderRadius: BorderRadius.circular(10.r),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.max,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Image.asset(
                      AppConstants.emptyProfile, // Doctor's profile picture
                      height: 80.h,
                      width: 80.w,
                    ),
                    SizedBox(width: 12.w),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                "Dr. John Doe", // Doctor's name
                                style: AppTextStyles.bodyTextBold,
                              ),
                              Align(
                                alignment: Alignment.centerRight,
                                child: SizedBox(
                                  width: 105.w,
                                  height: 25.h,
                                  child: Button(
                                    label: "Edit Profile",
                                    labelColor: AppColors.blue100,
                                    isValid: true,
                                    onTap: () {},
                                    outlineColor: AppColors.blue100,
                                    outlinedButton: true,
                                  ),
                                ),
                              ),
                            ],
                          ),
                          SizedBox(height: 4.h),
                          Row(
                            children: [
                              const Icon(Icons.medical_services_outlined),
                              SizedBox(width: 4.w),
                              Text(
                                "Specialty: Cardiologist", // Doctor's specialty
                                style: AppTextStyles.bodyTextMediumNormal,
                              ),
                            ],
                          ),
                          SizedBox(height: 4.h),
                          Row(
                            children: [
                              const Icon(Icons.email),
                              SizedBox(width: 4.w),
                              Text(
                                "dr.johndoe@hospital.com", // Doctor's email
                                style: AppTextStyles.bodyTextMediumNormal,
                              ),
                            ],
                          ),
                          Row(children: [
                            const Icon(Icons.phone),
                            SizedBox(width: 4.w),
                            Text(
                              "01234567892", // Doctor's email
                              style: AppTextStyles.bodyTextMediumNormal,
                            ),
                          ]),
                          Row(children: [
                            const Icon(Icons.calendar_month),
                            SizedBox(width: 4.w),
                            Text(
                              "1990", // Doctor's email
                              style: AppTextStyles.bodyTextMediumNormal,
                            ),
                          ])
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              Container(
                width: double.infinity,
                margin: EdgeInsets.all(8.r),
                padding: EdgeInsets.all(16.r),
                decoration: BoxDecoration(
                  color: AppColors.white,
                  borderRadius: BorderRadius.circular(10.r),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      "Years of Experience", // New section for doctors
                      style: AppTextStyles.bodyTextLargeBold
                          .copyWith(color: AppColors.blue100),
                    ),
                    SizedBox(height: 4.h),
                    Text(
                      "10 Years", // Example info
                      style: AppTextStyles.bodyTextLargeBold
                          .copyWith(color: AppColors.blue100),
                    ),
                    SizedBox(height: 10.h),
                    Button(
                      label: "Edit Experience",
                      labelColor: AppColors.white,
                      isValid: true,
                      onTap: () {},
                    ),
                  ],
                ),
              ),
              Container(
                width: double.infinity,
                margin: EdgeInsets.all(8.r),
                padding: EdgeInsets.all(16.r),
                decoration: BoxDecoration(
                  color: AppColors.white,
                  borderRadius: BorderRadius.circular(10.r),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      "Availability", // New section for doctors
                      style: AppTextStyles.bodyTextLargeBold
                          .copyWith(color: AppColors.blue100),
                    ),
                    SizedBox(height: 4.h),
                    Text(
                      "Mon / 2 pm - 4pm", // Example info
                      style: AppTextStyles.bodyTextLargeBold
                          .copyWith(color: AppColors.blue100),
                    ),
                    SizedBox(height: 10.h),
                    Button(
                      label: "Edit Availability",
                      labelColor: AppColors.white,
                      isValid: true,
                      onTap: () {},
                    ),
                  ],
                ),
              ),
              Container(
                width: double.infinity,
                margin: EdgeInsets.all(8.r),
                padding: EdgeInsets.all(16.r),
                decoration: BoxDecoration(
                  color: AppColors.white,
                  borderRadius: BorderRadius.circular(10.r),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      "Pricing", // New section for doctors
                      style: AppTextStyles.bodyTextLargeBold
                          .copyWith(color: AppColors.blue100),
                    ),
                    SizedBox(height: 4.h),
                    Text(
                      "30 minutes price", // Example info
                      style: AppTextStyles.bodyTextLargeBold
                          .copyWith(color: AppColors.black),
                    ),
                    Text(
                      "60 minutes price", // Example info
                      style: AppTextStyles.bodyTextLargeBold
                          .copyWith(color: AppColors.black),
                    ),
                    SizedBox(height: 10.h),
                    Button(
                      label: "Edit Pricing",
                      labelColor: AppColors.white,
                      isValid: true,
                      onTap: () {},
                    ),
                  ],
                ),
              ),
              Container(
                width: double.infinity,
                margin: EdgeInsets.all(8.r),
                padding: EdgeInsets.all(16.r),
                decoration: BoxDecoration(
                  color: AppColors.white,
                  borderRadius: BorderRadius.circular(10.r),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      "Reserved Appointments", // New section for doctors
                      style: AppTextStyles.bodyTextLargeBold
                          .copyWith(color: AppColors.blue100),
                    ),
                    SizedBox(height: 4.h),
                    Text(
                      "03:30 pm - mon", // Example info
                      style: AppTextStyles.bodyTextLargeBold
                          .copyWith(color: AppColors.black),
                    ),
                    SizedBox(height: 10.h),
                    Button(
                      label: "Manage Appointments",
                      labelColor: AppColors.white,
                      isValid: true,
                      onTap: () {},
                    ),
                  ],
                ),
              ),
              Container(
                width: double.infinity,
                margin: EdgeInsets.all(8.r),
                padding: EdgeInsets.all(16.r),
                decoration: BoxDecoration(
                  color: AppColors.white,
                  borderRadius: BorderRadius.circular(10.r),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      "Password",
                      style: AppTextStyles.bodyTextLargeBold
                          .copyWith(color: AppColors.blue100),
                    ),
                    SizedBox(height: 8.h),
                    Center(
                      child: Text(
                        "Change Password",
                        style: AppTextStyles.bodyTextMediumNormal
                            .copyWith(color: AppColors.teal0),
                      ),
                    ),
                  ],
                ),
              ),
              SizedBox(height: 8.h),
              GestureDetector(
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Transform(
                      alignment: Alignment.center,
                      transform: Matrix4.identity()..scale(-1.0, 1.0),
                      child: Icon(
                        Icons.logout,
                        color: AppColors.red100,
                        size: 25.sp,
                      ),
                    ),
                    SizedBox(width: 4.w),
                    Text(
                      "Sign Out",
                      style: AppTextStyles.bodyTextMediumNormal
                          .copyWith(color: AppColors.red100),
                    ),
                  ],
                ),
                onTap: () {
                  Navigator.pushNamedAndRemoveUntil(context,
                      RouteClass.initRoute, (Route<dynamic> route) => false);
                },
              )
            ],
          ),
        ),
      ),
    );
  }
}
