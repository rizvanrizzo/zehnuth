import 'package:dio/dio.dart';
import '../models/student.dart';
import '../models/award.dart';

class ApiService {
  final Dio _dio = Dio(BaseOptions(
    baseUrl: 'https://ais-dev-tikbzttysob3p2yvus7x3s-11666792567.asia-southeast1.run.app/api', // Points to our backend
    connectTimeout: const Duration(seconds: 5),
    receiveTimeout: const Duration(seconds: 3),
  ));

  Future<List<Student>> getLeaderboard() async {
    final response = await _dio.get('/students');
    return (response.data as List).map((e) => Student.fromJson(e)).toList();
  }

  Future<List<Student>> getMentees() async {
    final response = await _dio.get('/mentees');
    return (response.data as List).map((e) => Student.fromJson(e)).toList();
  }

  Future<List<Award>> getHistory() async {
    final response = await _dio.get('/history');
    return (response.data as List).map((e) => Award.fromJson(e)).toList();
  }

  Future<void> submitAward({
    required String studentId,
    required String category,
    required int points,
  }) async {
    await _dio.post('/award', data: {
      'studentId': studentId,
      'category': category,
      'points': points,
      'mentorId': 'm1', // Current mentor
    });
  }
}
