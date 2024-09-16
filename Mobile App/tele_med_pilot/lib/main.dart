import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:tele_med_pilot/core/global_keys.dart';
import 'package:tele_med_pilot/core/route.dart';
import 'package:tele_med_pilot/core/theme.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const ProviderScope(child: App()));
}

class App extends StatefulWidget {
  const App({super.key});

  @override
  State<StatefulWidget> createState() => _AppState();
}

class _AppState extends State<App> {
  @override
  Widget build(BuildContext context) {
    return ScreenUtilInit(
      designSize: const Size(360, 690),
      minTextAdapt: true,
      splitScreenMode: true,
      builder: (context, child) {
        return GestureDetector(
          onTap: () {
            final currentFocus = FocusManager.instance.primaryFocus;
            if (currentFocus != null) {
              currentFocus.unfocus();
            }
          },
          child: MaterialApp(
            navigatorKey: navigatorKey,
            initialRoute: RouteClass.initRoute,
            onGenerateRoute: RouteClass.generateRoute,
            debugShowCheckedModeBanner: false,
            theme: buildAppTheme(),
          ),
        );
      },
    );
  }
}