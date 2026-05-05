import 'package:flutter/material.dart';
import '../widgets/league_badge.dart';

class LeaderboardScreen extends StatelessWidget {
  const LeaderboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            expandedHeight: 300,
            floating: false,
            pinned: true,
            flexibleSpace: FlexibleSpaceBar(
              background: _buildPodium(),
            ),
          ),
          SliverList(
            delegate: SliverChildBuilderDelegate(
              (context, index) => _buildRankItem(index),
              childCount: 20,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPodium() {
    return Container(
      padding: const EdgeInsets.only(top: 100),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          _PodiumColumn(rank: 2, height: 100, name: "Alex R.", points: 820),
          _PodiumColumn(rank: 1, height: 150, name: "Sarah J.", points: 950, isWinner: true),
          _PodiumColumn(rank: 3, height: 80, name: "Chen W.", points: 760),
        ],
      ),
    );
  }

  Widget _buildRankItem(int index) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.03),
            blurRadius: 20,
            offset: const Offset(0, 10),
          ),
        ],
      ),
      child: Row(
        children: [
          Text("#${index + 4}", style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.grey)),
          const SizedBox(width: 16),
          const CircleAvatar(backgroundColor: Color(0xFFF1F5F9), child: Text("AR")),
          const SizedBox(width: 12),
          const Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text("User Name", style: TextStyle(fontWeight: FontWeight.bold)),
              LeagueBadge(league: "Platinum"),
            ],
          ),
          const Spacer(),
          const Text("450 pts", style: TextStyle(fontWeight: FontWeight.bold, color: Colors.amber)),
        ],
      ),
    );
  }
}

class _PodiumColumn extends StatelessWidget {
  final int rank;
  final double height;
  final String name;
  final int points;
  final bool isWinner;

  const _PodiumColumn({
    required this.rank,
    required this.height,
    required this.name,
    required this.points,
    this.isWinner = false,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        if (isWinner) const Text("👑", style: TextStyle(fontSize: 24)),
        CircleAvatar(radius: isWinner ? 35 : 25, backgroundColor: Colors.white),
        const SizedBox(height: 8),
        Container(
          width: 80,
          height: height,
          decoration: BoxDecoration(
            color: isWinner ? Colors.amber.shade50 : Colors.grey.shade50,
            borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
            border: Border.all(color: isWinner ? Colors.amber.shade200 : Colors.grey.shade200),
          ),
          child: Center(
            child: Text("$rank", style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold, color: isWinner ? Colors.amber : Colors.grey)),
          ),
        ),
        const SizedBox(height: 8),
        Text(name, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
        Text("$points PTS", style: const TextStyle(color: Colors.amber, fontWeight: FontWeight.bold, fontSize: 10)),
      ],
    );
  }
}
