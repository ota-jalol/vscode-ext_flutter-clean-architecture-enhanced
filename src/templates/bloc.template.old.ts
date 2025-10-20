import * as changeCase from "change-case";

export function getBlocTemplate (blocName: string, useEquatable: boolean, projectName: string = "my_app"): string {
  return useEquatable
    ? getEquatableBlocTemplate(blocName, projectName)
    : getDefaultBlocTemplate(blocName, projectName);
}

function getEquatableBlocTemplate (blocName: string, projectName: string = "my_app") {
  const pascalCaseBlocName = changeCase.pascalCase(blocName.toLowerCase());
  const snakeCaseBlocName = changeCase.snakeCase(blocName.toLowerCase());
  const blocState = `${pascalCaseBlocName}State`;
  const blocEvent = `${pascalCaseBlocName}Event`;
  return `import 'package:bloc/bloc.dart';
import 'package:dartz/dartz.dart';
import 'package:equatable/equatable.dart';
import 'package:${projectName}/core/error/failures.dart';
import 'package:${projectName}/features/${snakeCaseBlocName}/domain/entities/${snakeCaseBlocName}.dart';
import 'package:${projectName}/features/${snakeCaseBlocName}/domain/usecases/get_${snakeCaseBlocName}.dart';

part '${snakeCaseBlocName}_event.dart';
part '${snakeCaseBlocName}_state.dart';

const String SERVER_FAILURE_MESSAGE = 'Server Failure';
const String CACHE_FAILURE_MESSAGE = 'Cache Failure';
const String INVALID_INPUT_FAILURE_MESSAGE = 'Invalid Input - The number must be a positive integer or zero.';

class ${pascalCaseBlocName}Bloc extends Bloc<${blocEvent}, ${blocState}> {
  final Get${pascalCaseBlocName} get${pascalCaseBlocName};

  ${pascalCaseBlocName}Bloc({
    required this.get${pascalCaseBlocName},
  }) : super(Empty()) {
    on<Get${pascalCaseBlocName}ForId>(_onGet${pascalCaseBlocName}ForId);
    on<GetRandom${pascalCaseBlocName}>(_onGetRandom${pascalCaseBlocName});
  }

  void _onGet${pascalCaseBlocName}ForId(
    Get${pascalCaseBlocName}ForId event,
    Emitter<${pascalCaseBlocName}State> emit,
  ) async {
    final inputEither = _inputConverter(event.id);
    await inputEither.fold(
      (failure) async {
        emit(const Error(message: INVALID_INPUT_FAILURE_MESSAGE));
      },
      (integer) async {
        emit(Loading());
        final failureOrNumber = await get${pascalCaseBlocName}(params: Get${pascalCaseBlocName}Params(id: integer));
        emit(_eitherLoadedOrErrorState(failureOrNumber));
      },
    );
  }

  void _onGetRandom${pascalCaseBlocName}(
    GetRandom${pascalCaseBlocName} event,
    Emitter<${pascalCaseBlocName}State> emit,
  ) async {
    emit(Loading());
    final failureOrNumber = await get${pascalCaseBlocName}(params: Get${pascalCaseBlocName}Params(id: 1)); // Random logic to be implemented
    emit(_eitherLoadedOrErrorState(failureOrNumber));
  }

  ${pascalCaseBlocName}State _eitherLoadedOrErrorState(
    Either<Failure, ${pascalCaseBlocName}> either,
  ) {
    return either.fold(
      (failure) => Error(message: _mapFailureToMessage(failure)),
      (${changeCase.camelCase(blocName.toLowerCase())}) => Loaded(${changeCase.camelCase(blocName.toLowerCase())}: ${changeCase.camelCase(blocName.toLowerCase())}),
    );
  }

  String _mapFailureToMessage(Failure failure) {
    switch (failure.runtimeType) {
      case ServerFailure:
        return SERVER_FAILURE_MESSAGE;
      case CacheFailure:
        return CACHE_FAILURE_MESSAGE;
      default:
        return 'Unexpected Error';
    }
  }

  Either<Failure, int> _inputConverter(String str) {
    try {
      final integer = int.parse(str);
      if (integer < 0) throw const FormatException();
      return Right(integer);
    } on FormatException {
      return Left(InvalidInputFailure());
    }
  }
}
`;
}

function getDefaultBlocTemplate (blocName: string, projectName: string = "my_app") {
  const pascalCaseBlocName = changeCase.pascalCase(blocName.toLowerCase());
  const snakeCaseBlocName = changeCase.snakeCase(blocName.toLowerCase());
  const blocState = `${pascalCaseBlocName}State`;
  const blocEvent = `${pascalCaseBlocName}Event`;
  return `import 'package:bloc/bloc.dart';
import 'package:dartz/dartz.dart';
import 'package:meta/meta.dart';
import 'package:${projectName}/core/error/failures.dart';
import 'package:${projectName}/features/${snakeCaseBlocName}/domain/entities/${snakeCaseBlocName}.dart';
import 'package:${projectName}/features/${snakeCaseBlocName}/domain/usecases/get_${snakeCaseBlocName}.dart';

part '${snakeCaseBlocName}_event.dart';
part '${snakeCaseBlocName}_state.dart';

const String SERVER_FAILURE_MESSAGE = 'Server Failure';
const String CACHE_FAILURE_MESSAGE = 'Cache Failure';
const String INVALID_INPUT_FAILURE_MESSAGE = 'Invalid Input - The number must be a positive integer or zero.';

class ${pascalCaseBlocName}Bloc extends Bloc<${blocEvent}, ${blocState}> {
  final Get${pascalCaseBlocName} get${pascalCaseBlocName};

  ${pascalCaseBlocName}Bloc({
    required this.get${pascalCaseBlocName},
  }) : super(Empty()) {
    on<Get${pascalCaseBlocName}ForId>(_onGet${pascalCaseBlocName}ForId);
    on<GetRandom${pascalCaseBlocName}>(_onGetRandom${pascalCaseBlocName});
  }

  void _onGet${pascalCaseBlocName}ForId(
    Get${pascalCaseBlocName}ForId event,
    Emitter<${pascalCaseBlocName}State> emit,
  ) async {
    final inputEither = _inputConverter(event.id);
    await inputEither.fold(
      (failure) async {
        emit(const Error(message: INVALID_INPUT_FAILURE_MESSAGE));
      },
      (integer) async {
        emit(Loading());
        final failureOrNumber = await get${pascalCaseBlocName}(params: Get${pascalCaseBlocName}Params(id: integer));
        emit(_eitherLoadedOrErrorState(failureOrNumber));
      },
    );
  }

  void _onGetRandom${pascalCaseBlocName}(
    GetRandom${pascalCaseBlocName} event,
    Emitter<${pascalCaseBlocName}State> emit,
  ) async {
    emit(Loading());
    final failureOrNumber = await get${pascalCaseBlocName}(params: Get${pascalCaseBlocName}Params(id: 1)); // Random logic to be implemented
    emit(_eitherLoadedOrErrorState(failureOrNumber));
  }

  ${pascalCaseBlocName}State _eitherLoadedOrErrorState(
    Either<Failure, ${pascalCaseBlocName}> either,
  ) {
    return either.fold(
      (failure) => Error(message: _mapFailureToMessage(failure)),
      (${changeCase.camelCase(blocName.toLowerCase())}) => Loaded(${changeCase.camelCase(blocName.toLowerCase())}: ${changeCase.camelCase(blocName.toLowerCase())}),
    );
  }

  String _mapFailureToMessage(Failure failure) {
    switch (failure.runtimeType) {
      case ServerFailure:
        return SERVER_FAILURE_MESSAGE;
      case CacheFailure:
        return CACHE_FAILURE_MESSAGE;
      default:
        return 'Unexpected Error';
    }
  }

  Either<Failure, int> _inputConverter(String str) {
    try {
      final integer = int.parse(str);
      if (integer < 0) throw const FormatException();
      return Right(integer);
    } on FormatException {
      return Left(InvalidInputFailure());
    }
  }
}
`;
}