import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../data/models/student.dart';
import '../../data/services/api_service.dart';

final apiServiceProvider = Provider((ref) => ApiService());

final leaderboardProvider = FutureProvider<List<Student>>((ref) async {
  return ref.watch(apiServiceProvider).getLeaderboard();
});

final menteesProvider = FutureProvider<List<Student>>((ref) async {
  return ref.watch(apiServiceProvider).getMentees();
});

final historyProvider = FutureProvider((ref) async {
  return ref.watch(apiServiceProvider).getHistory();
});
