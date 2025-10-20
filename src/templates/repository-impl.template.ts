import * as changeCase from "change-case";

export function getRepositoryImplTemplate(featureName: string): string {
  const pascalCaseFeatureName = changeCase.pascalCase(featureName.toLowerCase());
  const camelCaseFeatureName = changeCase.camelCase(featureName.toLowerCase());
  const snakeCaseFeatureName = changeCase.snakeCase(featureName.toLowerCase());
  
  return `import 'package:dartz/dartz.dart';

import '../../domain/entities/${snakeCaseFeatureName}.dart';
import '../../domain/repositories/${snakeCaseFeatureName}_repository.dart';
import '../../core/error/failures.dart';
import '../../core/error/exceptions.dart';
import '../../core/network/network_info.dart';
import '../datasources/${snakeCaseFeatureName}_local_data_source.dart';
import '../datasources/${snakeCaseFeatureName}_remote_data_source.dart';
import '../models/${snakeCaseFeatureName}_model.dart';

typedef _${pascalCaseFeatureName}Chooser = Future<${pascalCaseFeatureName}Model> Function();

class ${pascalCaseFeatureName}RepositoryImpl implements ${pascalCaseFeatureName}Repository {
  final ${pascalCaseFeatureName}RemoteDataSource remoteDataSource;
  final ${pascalCaseFeatureName}LocalDataSource localDataSource;
  final NetworkInfo networkInfo;

  ${pascalCaseFeatureName}RepositoryImpl({
    required this.remoteDataSource,
    required this.localDataSource,
    required this.networkInfo,
  });

  @override
  Future<Either<Failure, List<${pascalCaseFeatureName}>>> get${pascalCaseFeatureName}s() async {
    if (await networkInfo.isConnected) {
      try {
        final remote${pascalCaseFeatureName}s = await remoteDataSource.get${pascalCaseFeatureName}s();
        // Cache for temporary use during session
        localDataSource.cache${pascalCaseFeatureName}s(remote${pascalCaseFeatureName}s);
        return Right(remote${pascalCaseFeatureName}s.map((model) => model.toEntity()).toList());
      } on ServerException {
        return Left(ServerFailure());
      }
    } else {
      // Try to get cached data if available
      final cached${pascalCaseFeatureName}s = await localDataSource.getCached${pascalCaseFeatureName}s();
      if (cached${pascalCaseFeatureName}s != null && cached${pascalCaseFeatureName}s.isNotEmpty) {
        return Right(cached${pascalCaseFeatureName}s.map((model) => model.toEntity()).toList());
      }
      return Left(ServerFailure());
    }
  }

  @override
  Future<Either<Failure, ${pascalCaseFeatureName}>> get${pascalCaseFeatureName}(int id) async {
    return await _get${pascalCaseFeatureName}(
      () => remoteDataSource.get${pascalCaseFeatureName}(id),
    );
  }

  @override
  Future<Either<Failure, ${pascalCaseFeatureName}>> create${pascalCaseFeatureName}(${pascalCaseFeatureName} ${camelCaseFeatureName}) async {
    if (await networkInfo.isConnected) {
      try {
        final ${camelCaseFeatureName}Model = ${camelCaseFeatureName}.toModel();
        final result = await remoteDataSource.create${pascalCaseFeatureName}(${camelCaseFeatureName}Model);
        return Right(result.toEntity());
      } on ServerException {
        return Left(ServerFailure());
      }
    } else {
      return Left(ServerFailure());
    }
  }

  @override
  Future<Either<Failure, ${pascalCaseFeatureName}>> update${pascalCaseFeatureName}(${pascalCaseFeatureName} ${camelCaseFeatureName}) async {
    if (await networkInfo.isConnected) {
      try {
        final ${camelCaseFeatureName}Model = ${camelCaseFeatureName}.toModel();
        final result = await remoteDataSource.update${pascalCaseFeatureName}(${camelCaseFeatureName}Model);
        return Right(result.toEntity());
      } on ServerException {
        return Left(ServerFailure());
      }
    } else {
      return Left(ServerFailure());
    }
  }

  @override
  Future<Either<Failure, bool>> delete${pascalCaseFeatureName}(int id) async {
    if (await networkInfo.isConnected) {
      try {
        await remoteDataSource.delete${pascalCaseFeatureName}(id);
        return const Right(true);
      } on ServerException {
        return Left(ServerFailure());
      }
    } else {
      return Left(ServerFailure());
    }
  }

  Future<Either<Failure, ${pascalCaseFeatureName}>> _get${pascalCaseFeatureName}(
    _${pascalCaseFeatureName}Chooser get${pascalCaseFeatureName},
  ) async {
    if (await networkInfo.isConnected) {
      try {
        final remote${pascalCaseFeatureName} = await get${pascalCaseFeatureName}();
        localDataSource.cache${pascalCaseFeatureName}(remote${pascalCaseFeatureName});
        return Right(remote${pascalCaseFeatureName}.toEntity());
      } on ServerException {
        return Left(ServerFailure());
      }
    } else {
      return Left(ServerFailure());
    }
  }
}
`;
}