import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'presentation/screens/main_navigation.dart';

void main() {
  runApp(
    const ProviderScope(
      child: ZehnuthApp(),
    ),
  );
}

class ZehnuthApp extends StatelessWidget {
  const ZehnuthApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'ZEHNUTH',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        fontFamily: 'Inter',
        scaffoldBackgroundColor: const Color(0xFFF8FAFC),
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.amber,
          primary: const Color(0xFFD97706),
        ),
        useMaterial3: true,
      ),
      home: const MainNavigation(),
    );
  }
}
