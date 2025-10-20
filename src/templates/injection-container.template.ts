import * as changeCase from "change-case";

export function getInjectionContainerTemplate(featureName: string, projectName: string = "my_app"): string {
  const pascalCaseFeatureName = changeCase.pascalCase(featureName.toLowerCase());
  const snakeCaseFeatureName = changeCase.snakeCase(featureName.toLowerCase());
  
  return `import 'package:dio/dio.dart';
import 'package:get_it/get_it.dart';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:${projectName}/core/network/network_info.dart';
import 'package:${projectName}/features/${snakeCaseFeatureName}/data/datasources/${snakeCaseFeatureName}_local_data_source.dart';
import 'package:${projectName}/features/${snakeCaseFeatureName}/data/datasources/${snakeCaseFeatureName}_remote_data_source.dart';
import 'package:${projectName}/features/${snakeCaseFeatureName}/data/repositories/${snakeCaseFeatureName}_repository_impl.dart';
import 'package:${projectName}/features/${snakeCaseFeatureName}/domain/repositories/${snakeCaseFeatureName}_repository.dart';
import 'package:${projectName}/features/${snakeCaseFeatureName}/domain/usecases/get${snakeCaseFeatureName}.dart';
import 'package:${projectName}/features/${snakeCaseFeatureName}/presentation/bloc/${snakeCaseFeatureName}_bloc.dart';

final sl = GetIt.instance;

Future<void> init() async {
  //! Features - ${pascalCaseFeatureName}
  // Bloc
  sl.registerFactory(
    () => ${pascalCaseFeatureName}Bloc(
      get${pascalCaseFeatureName}: sl(),
    ),
  );

  // Use cases
  sl.registerLazySingleton(() => Get${snakeCaseFeatureName}(sl()));

  // Repository
  sl.registerLazySingleton<${pascalCaseFeatureName}Repository>(
    () => ${pascalCaseFeatureName}RepositoryImpl(
      remoteDataSource: sl(),
      localDataSource: sl(),
      networkInfo: sl(),
    ),
  );

  // Data sources
  sl.registerLazySingleton<${pascalCaseFeatureName}RemoteDataSource>(
    () => ${pascalCaseFeatureName}RemoteDataSourceImpl(dio: sl()),
  );

  sl.registerLazySingleton<${pascalCaseFeatureName}LocalDataSource>(
    () => ${pascalCaseFeatureName}LocalDataSourceImpl(),
  );

  //! Core
  sl.registerLazySingleton<NetworkInfo>(() => NetworkInfoImpl(sl()));

  //! External
  sl.registerLazySingleton(() => Dio());
  sl.registerLazySingleton(() => Connectivity());
}
`;
}