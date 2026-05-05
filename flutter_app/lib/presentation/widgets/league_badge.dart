import 'package:flutter/material.dart';

class LeagueBadge extends StatelessWidget {
  final String league;

  const LeagueBadge({super.key, required this.league});

  @override
  Widget build(BuildContext context) {
    Color color;
    switch (league) {
      case 'Diamond': color = Colors.blue; break;
      case 'Platinum': color = Colors.slate; break;
      case 'Emerald': color = Colors.emerald; break;
      case 'Gold': color = Colors.amber; break;
      default: color = Colors.orange;
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: color.withOpacity(0.2)),
      ),
      child: Text(
        league.toUpperCase(),
        style: TextStyle(fontSize: 8, fontWeight: FontWeight.black, color: color, letterSpacing: 1),
      ),
    );
  }
}
