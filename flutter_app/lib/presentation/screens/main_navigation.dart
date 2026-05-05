import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'leaderboard_screen.dart';
import 'submit_point_screen.dart';
import 'history_screen.dart';
import 'mentees_screen.dart';

class MainNavigation extends StatefulWidget {
  const MainNavigation({super.key});

  @override
  State<MainNavigation> createState() => _MainNavigationState();
}

class _MainNavigationState extends State<MainNavigation> {
  int _currentIndex = 0;

  final List<Widget> _screens = [
    const LeaderboardScreen(),
    const SubmitPointScreen(),
    const HistoryScreen(),
    const MenteesScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: _screens,
      ),
      bottomNavigationBar: Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 20),
        decoration: const BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.vertical(top: Radius.circular(32)),
          boxShadow: [BoxShadow(color: Colors.black12, blurRadius: 20)],
        ),
        child: BottomNavigationBar(
          currentIndex: _currentIndex,
          onTap: (i) => setState(() => _currentIndex = i),
          backgroundColor: Colors.transparent,
          elevation: 0,
          type: BottomNavigationBarType.fixed,
          selectedItemColor: Colors.amber.shade700,
          unselectedItemColor: Colors.grey.shade400,
          showSelectedLabels: true,
          showUnselectedLabels: true,
          selectedLabelStyle: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold),
          unselectedLabelStyle: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold),
          items: const [
            BottomNavigationBarItem(icon: Icon(LucideIcons.trophy), label: "LEADERBOARD"),
            BottomNavigationBarItem(icon: Icon(LucideIcons.plusCircle), label: "SUBMIT"),
            BottomNavigationBarItem(icon: Icon(LucideIcons.history), label: "HISTORY"),
            BottomNavigationBarItem(icon: Icon(LucideIcons.users), label: "MENTEES"),
          ],
        ),
      ),
      floatingActionButton: _currentIndex != 1 ? FloatingActionButton(
        onPressed: () => setState(() => _currentIndex = 1),
        backgroundColor: Colors.black,
        child: const Icon(Icons.add, color: Colors.white),
      ) : null,
    );
  }
}
