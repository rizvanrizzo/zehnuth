import 'package:flutter/material.dart';

class SubmitPointScreen extends StatefulWidget {
  const SubmitPointScreen({super.key});

  @override
  State<SubmitPointScreen> createState() => _SubmitPointScreenState();
}

class _SubmitPointScreenState extends State<SubmitPointScreen> {
  String? selectedMentee;
  String? selectedCategory;
  int? selectedValue;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Award Points", style: TextStyle(fontWeight: FontWeight.bold))),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildSectionTitle("1. SELECT STUDENT"),
            _buildMenteeDropdown(),
            const SizedBox(height: 32),
            _buildSectionTitle("2. CATEGORY"),
            _buildCategoryGrid(),
            const SizedBox(height: 32),
            _buildSectionTitle("3. SCORE"),
            _buildScoreRow(),
            const SizedBox(height: 48),
            _buildSubmitButton(),
          ],
        ),
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Padding(
      padding: const EdgeInsets.only(left: 8, bottom: 12),
      child: Text(title, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.grey, letterSpacing: 1.2)),
    );
  }

  Widget _buildMenteeDropdown() {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 10)],
      ),
      child: DropdownButtonFormField<String>(
        decoration: const InputDecoration(border: InputBorder.none, contentPadding: EdgeInsets.symmetric(horizontal: 20)),
        hint: const Text("Select a student..."),
        items: const ["Mila James", "Alex Rivera"].map((e) => DropdownMenuItem(value: e, child: Text(e))).toList(),
        onChanged: (v) => setState(() => selectedMentee = v),
      ),
    );
  }

  Widget _buildCategoryGrid() {
    final categories = [
      {'id': 'exam', 'icon': '📝', 'name': 'EXAM'},
      {'id': 'pres', 'icon': '🗣️', 'name': 'PRESENTATION'},
      {'id': 'writ', 'icon': '✍️', 'name': 'WRITINGS'},
      {'id': 'bon', 'icon': '✨', 'name': 'BONUS'},
    ];

    return GridView.count(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      crossAxisCount: 2,
      mainAxisSpacing: 12,
      crossAxisSpacing: 12,
      children: categories.map((cat) {
        final isSelected = selectedCategory == cat['id'];
        return GestureDetector(
          onTap: () => setState(() => selectedCategory = cat['id'] as String),
          child: Container(
            decoration: BoxDecoration(
              color: isSelected ? Colors.amber : Colors.white,
              borderRadius: BorderRadius.circular(32),
              border: Border.all(color: isSelected ? Colors.amber : Colors.grey.shade100),
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(cat['icon'] as String, style: const TextStyle(fontSize: 24)),
                const SizedBox(height: 8),
                Text(cat['name'] as String, style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: isSelected ? Colors.white : Colors.black)),
              ],
            ),
          ),
        );
      }).toList(),
    );
  }

  Widget _buildScoreRow() {
    final scores = [10, 25, 50];
    return Row(
      children: scores.map((s) {
        final isSelected = selectedValue == s;
        return Expanded(
          child: GestureDetector(
            onTap: () => setState(() => selectedValue = s),
            child: Container(
              margin: const EdgeInsets.symmetric(horizontal: 4),
              padding: const EdgeInsets.symmetric(vertical: 16),
              decoration: BoxDecoration(
                color: isSelected ? Colors.black : Colors.white,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: Colors.grey.shade100),
              ),
              child: Center(
                child: Text("+$s", style: TextStyle(fontWeight: FontWeight.bold, color: isSelected ? Colors.white : Colors.black)),
              ),
            ),
          ),
        );
      }).toList(),
    );
  }

  Widget _buildSubmitButton() {
    return SizedBox(
      width: double.infinity,
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          backgroundColor: Colors.black,
          foregroundColor: Colors.white,
          padding: const EdgeInsets.symmetric(vertical: 20),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
        ),
        onPressed: () {},
        child: const Text("Award Points ✨", style: TextStyle(fontWeight: FontWeight.bold, letterSpacing: 1)),
      ),
    );
  }
}
