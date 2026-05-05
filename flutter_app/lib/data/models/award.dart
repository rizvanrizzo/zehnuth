import 'package:json_annotation/json_annotation.dart';

part 'award.g.dart';

@JsonSerializable()
class Award {
  final String id;
  final String studentId;
  final String studentName;
  final String category;
  final int points;
  final String date;
  final String mentorId;

  Award({
    required this.id,
    required this.studentId,
    required this.studentName,
    required this.category,
    required this.points,
    required this.date,
    required this.mentorId,
  });

  factory Award.fromJson(Map<String, dynamic> json) => _$AwardFromJson(json);
  Map<String, dynamic> toJson() => _$AwardToJson(json);
}
