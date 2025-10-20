import * as changeCase from "change-case";

export function getPageTemplate(featureName: string): string {
  const pascalCaseFeatureName = changeCase.pascalCase(featureName.toLowerCase());
  const snakeCaseFeatureName = changeCase.snakeCase(featureName.toLowerCase());
  
  return `import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../injection_container.dart';
import '../bloc/${snakeCaseFeatureName}_bloc.dart';
import '../widgets/${snakeCaseFeatureName}_display.dart';
import '../widgets/${snakeCaseFeatureName}_controls.dart';
import '../widgets/loading_widget.dart';
import '../widgets/message_display.dart';

class ${pascalCaseFeatureName}Page extends StatelessWidget {
  const ${pascalCaseFeatureName}Page({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('${pascalCaseFeatureName}'),
      ),
      body: SingleChildScrollView(
        child: BlocProvider(
          create: (_) => sl<${pascalCaseFeatureName}Bloc>(),
          child: Column(
            children: <Widget>[
              const SizedBox(height: 10),
              // Top half
              BlocBuilder<${pascalCaseFeatureName}Bloc, ${pascalCaseFeatureName}State>(
                builder: (context, state) {
                  if (state is Empty) {
                    return const MessageDisplay(
                      message: 'Start searching!',
                    );
                  } else if (state is Loading) {
                    return const LoadingWidget();
                  } else if (state is Loaded) {
                    return ${pascalCaseFeatureName}Display(${changeCase.camelCase(featureName.toLowerCase())}: state.${changeCase.camelCase(featureName.toLowerCase())});
                  } else if (state is Error) {
                    return MessageDisplay(
                      message: state.message,
                    );
                  }
                  return Container();
                },
              ),
              const SizedBox(height: 20),
              // Bottom half
              const ${pascalCaseFeatureName}Controls()
            ],
          ),
        ),
      ),
    );
  }
}
`;
}