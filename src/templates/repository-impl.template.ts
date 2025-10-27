import * as changeCase from "change-case";

export function getRepositoryImplTemplate(featureName: string, projectName: string = "my_app"): string {
  const pascalCaseFeatureName = changeCase.pascalCase(featureName.toLowerCase());
  const camelCaseFeatureName = changeCase.camelCase(featureName.toLowerCase());
  const snakeCaseFeatureName = changeCase.snakeCase(featureName.toLowerCase());
  
  return `import 'package:dartz/dartz.dart';
import 'package:${projectName}/core/error/failures.dart';
import 'package:${projectName}/core/error/exceptions.dart';
import 'package:${projectName}/core/network/network_info.dart';
import 'package:${projectName}/features/${snakeCaseFeatureName}/domain/entities/${snakeCaseFeatureName}.dart';
import 'package:${projectName}/features/${snakeCaseFeatureName}/domain/repositories/${snakeCaseFeatureName}_repository.dart';
import 'package:${projectName}/features/${snakeCaseFeatureName}/data/datasources/${snakeCaseFeatureName}_local_data_source.dart';
import 'package:${projectName}/features/${snakeCaseFeatureName}/data/datasources/${snakeCaseFeatureName}_remote_data_source.dart';
import 'package:${projectName}/features/${snakeCaseFeatureName}/data/models/${snakeCaseFeatureName}_model.dart';

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
  Future<Either<Failure, ${pascalCaseFeatureName}>> get${pascalCaseFeatureName}(int id) async {
    if (await networkInfo.isConnected) {
      try {
        final remote${pascalCaseFeatureName} = await remoteDataSource.get${pascalCaseFeatureName}(id);
        localDataSource.cache${pascalCaseFeatureName}(remote${pascalCaseFeatureName});
        return Right(remote${pascalCaseFeatureName}.toEntity());
      } on ServerException {
        return Left(ServerFailure());
      }
    } else {
      final cached${pascalCaseFeatureName} = await localDataSource.getCached${pascalCaseFeatureName}(id);
      if (cached${pascalCaseFeatureName} != null) {
        return Right(cached${pascalCaseFeatureName}.toEntity());
      }
      return Left(ServerFailure());
    }
  }
}
`;
}