import 'package:json_annotation/json_annotation.dart';

part 'student.g.dart';

enum League { Diamond, Platinum, Emerald, Gold, Bronze }

@JsonSerializable()
class Student {
  final String id;
  final String name;
  final int points;
  final String mentorId;
  final String league;

  Student({
    required this.id,
    required this.name,
    required this.points,
    required this.mentorId,
    required this.league,
  });

  factory Student.fromJson(Map<String, dynamic> json) => _$StudentFromJson(json);
  Map<String, dynamic> toJson() => _$StudentToJson(json);

  String get initials => name.split(' ').map((e) => e[0]).take(2).join('').toUpperCase();
}
