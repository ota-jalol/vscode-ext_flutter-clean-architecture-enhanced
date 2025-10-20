export function getFailuresTemplate(): string {
  return `import 'package:equatable/equatable.dart';

abstract class Failure extends Equatable {
  const Failure([List properties = const <dynamic>[]]);
}

// General failures
class ServerFailure extends Failure {
  @override
  List<Object> get props => [];
}

class CacheFailure extends Failure {
  @override
  List<Object> get props => [];
}

class InvalidInputFailure extends Failure {
  @override
  List<Object> get props => [];
}
`;
}

export function getExceptionsTemplate(): string {
  return `class ServerException implements Exception {}

class CacheException implements Exception {}
`;
}

export function getCoreUseCaseTemplate(): string {
  return `import 'package:dartz/dartz.dart';
import 'package:equatable/equatable.dart';

import '../error/failures.dart';

abstract class UseCase<Type, Params> {
  Future<Either<Failure, Type>> call(Params params);
}

class NoParams extends Equatable {
  @override
  List<Object> get props => [];
}

class Params extends Equatable {
  final int id;

  const Params({required this.id});

  @override
  List<Object> get props => [id];
}
`;
}

export function getNetworkInfoTemplate(): string {
  return `import 'package:connectivity_plus/connectivity_plus.dart';

abstract class NetworkInfo {
  Future<bool> get isConnected;
}

class NetworkInfoImpl implements NetworkInfo {
  final Connectivity connectivity;

  NetworkInfoImpl(this.connectivity);

  @override
  Future<bool> get isConnected => _hasConnection();

  Future<bool> _hasConnection() async {
    final result = await connectivity.checkConnectivity();
    return result != ConnectivityResult.none;
  }
}
`;
}