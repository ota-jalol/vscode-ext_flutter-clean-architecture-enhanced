import * as changeCase from "change-case";

export function getControlsWidgetTemplate(featureName: string): string {
  const pascalCaseFeatureName = changeCase.pascalCase(featureName.toLowerCase());
  const snakeCaseFeatureName = changeCase.snakeCase(featureName.toLowerCase());
  
  return `import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../bloc/${snakeCaseFeatureName}_bloc.dart';

class ${pascalCaseFeatureName}Controls extends StatefulWidget {
  const ${pascalCaseFeatureName}Controls({Key? key}) : super(key: key);

  @override
  State<${pascalCaseFeatureName}Controls> createState() => _${pascalCaseFeatureName}ControlsState();
}

class _${pascalCaseFeatureName}ControlsState extends State<${pascalCaseFeatureName}Controls> {
  final controller = TextEditingController();
  String inputStr = '';

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        TextField(
          controller: controller,
          decoration: const InputDecoration(
            border: OutlineInputBorder(),
            hintText: 'Input a number',
          ),
          onChanged: (value) {
            inputStr = value;
          },
          onSubmitted: (_) {
            dispatchSearch();
          },
        ),
        const SizedBox(height: 10),
        Row(
          children: <Widget>[
            Expanded(
              child: ElevatedButton(
                child: const Text('Search'),
                onPressed: dispatchSearch,
              ),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: ElevatedButton(
                child: const Text('Get random ${featureName.toLowerCase()}'),
                onPressed: dispatchRandom,
              ),
            ),
          ],
        )
      ],
    );
  }

  void dispatchSearch() {
    controller.clear();
    BlocProvider.of<${pascalCaseFeatureName}Bloc>(context)
        .add(Get${pascalCaseFeatureName}ForId(inputStr));
  }

  void dispatchRandom() {
    controller.clear();
    BlocProvider.of<${pascalCaseFeatureName}Bloc>(context)
        .add(GetRandom${pascalCaseFeatureName}());
  }
}
`;
}