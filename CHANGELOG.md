# Changelog

All notable changes to this enhanced project will be documented in this file.

## [3.0.0] - 2025-10-20 - Enhanced Version by OtaJalol

### 🎉 Major Rewrite and Enhancement

Bu versiya [KiritchoukC/vscode-ext_flutter-clean-architecture](https://github.com/KiritchoukC/vscode-ext_flutter-clean-architecture) loyihasidan fork olingan va butunlay qayta yozilgan.

### ✨ Yangi Imkoniyatlar

#### 🏗️ Complete Architecture Generation
- **15+ Files**: Har bir feature uchun to'liq fayl strukturasi
- **Domain Layer**: Freezed entities, abstract repositories, use cases
- **Data Layer**: Models with JSON serialization, repository implementations, data sources
- **Presentation Layer**: Modern BLoC, pages, widgets
- **Core Layer**: Failures, exceptions, network info, use cases

#### 🔧 Modern Technology Stack
- **Freezed 2.4.7**: Immutable data classes
- **BLoC 8.1.6**: Latest state management
- **Dio 5.4.0**: HTTP client
- **Dartz 0.10.1**: Functional programming (Either, Option)
- **GetIt 7.6.4**: Dependency injection
- **SharedPreferences 2.2.2**: Local storage
- **Connectivity Plus 5.0.2**: Network status

#### 🎯 Enhanced BLoC Pattern
- **Modern Event Handling**: BLoC 8.x syntax
- **Comprehensive States**: Empty, Loading, Loaded, Error
- **Input Validation**: Built-in validation logic
- **Error Mapping**: Proper failure-to-message mapping
- **Dependency Injection**: Constructor injection ready

#### 📝 Code Generation Ready
- **JSON Serialization**: json_annotation + build_runner
- **Freezed Models**: Automatic copyWith, equality, toString
- **Build Scripts**: Ready for code generation

#### 🧪 Testing Support
- **BLoC Test 9.1.7**: State testing utilities
- **Mockito 5.4.4**: Mocking for unit tests
- **Test Structure**: Proper test setup ready

### 🗑️ Olib Tashlangan
- **Cubit Support**: Soddalik uchun faqat BLoC pattern qoldirilgan
- **Eski Dependencies**: Barcha dependency lar yangilangan

### 🔄 Migration from Original
Agar siz asl extension dan migratsiya qilmoqchi bo'lsangiz:
1. Eski feature larni backup oling
2. Yangi extension ni o'rnating  
3. Yangi feature lar yarating
4. Kod strukturasini yangi pattern ga moslang

### 🙏 Minnatdorchilik
- **Asl Muallif**: [KiritchoukC](https://github.com/KiritchoukC)
- **Tutorial**: [ResoCoder Clean Architecture](https://resocoder.com/2019/08/27/flutter-tdd-clean-architecture-course-1-explanation-project-structure/)
- **BLoC Library**: [Felix Angelov](https://github.com/felangel)

---

## Original Changelog (v1.0.9 va oldingi versiyalar)

Quyidagi changelog asl loyihadan olingan:

### [1.0.9](https://github.com/KiritchoukC/vscode-ext_flutter-clean-architecture/compare/v1.0.8...v1.0.9) (2020-10-25)

### [1.0.8](https://github.com/KiritchoukC/vscode-ext_flutter-clean-architecture/compare/v1.0.7...v1.0.8) (2020-10-25)

### [1.0.7](https://github.com/KiritchoukC/vscode-ext_flutter-clean-architecture/compare/v1.0.6...v1.0.7) (2020-10-25)


### Bug Fixes

* **vscode-types:** downgrade @types/vscode to 1.31.0 ([c118ceb](https://github.com/KiritchoukC/vscode-ext_flutter-clean-architecture/commit/c118ceb))

### [1.0.6](https://github.com/KiritchoukC/vscode-ext_flutter-clean-architecture/compare/v1.0.5...v1.0.6) (2020-10-25)


### Bug Fixes

* **vscode-engine:** set vscode engine to 1.31.0 ([b1087b8](https://github.com/KiritchoukC/vscode-ext_flutter-clean-architecture/commit/b1087b8))

### [1.0.5](https://github.com/KiritchoukC/vscode-ext_flutter-clean-architecture/compare/v1.0.4...v1.0.5) (2020-10-25)


### Bug Fixes

* **get-pubspec:** remove typed return of the getPubspec function ([e12c8f4](https://github.com/KiritchoukC/vscode-ext_flutter-clean-architecture/commit/e12c8f4))

### [1.0.3](https://github.com/KiritchoukC/vscode-ext_flutter-clean-architecture/compare/v1.0.2...v1.0.3) (2020-10-25)


### Bug Fixes

* **update-bloc-code:** update the bloc's code with original extension's code ([a5ccf25](https://github.com/KiritchoukC/vscode-ext_flutter-clean-architecture/commit/a5ccf25)), closes [#9](https://github.com/KiritchoukC/vscode-ext_flutter-clean-architecture/issues/9)

### [1.0.4](https://github.com/KiritchoukC/vscode-ext_flutter-clean-architecture/compare/v1.0.2...v1.0.4) (2020-10-25)

### [1.0.3](https://github.com/KiritchoukC/vscode-ext_flutter-clean-architecture/compare/v1.0.2...v1.0.3) (2020-10-25)


### Bug Fixes

* **update-bloc-code:** update the bloc's code with original extension's code ([a5ccf25](https://github.com/KiritchoukC/vscode-ext_flutter-clean-architecture/commit/a5ccf25)), closes [#9](https://github.com/KiritchoukC/vscode-ext_flutter-clean-architecture/issues/9)

### [1.0.2](https://github.com/KiritchoukC/vscode-ext_flutter-clean-architecture/compare/v0.0.14...v1.0.2) (2020-10-25)

### [0.0.14](https://github.com/KiritchoukC/vscode-ext_flutter-clean-architecture/compare/v0.0.12...v0.0.14) (2020-07-08)


### Features

* **bloc-5-migration:** migrate the extension to bloc 5.x ([45da4b5](https://github.com/KiritchoukC/vscode-ext_flutter-clean-architecture/commit/45da4b5)), closes [#4](https://github.com/KiritchoukC/vscode-ext_flutter-clean-architecture/issues/4)

### [0.0.12](https://github.com/KiritchoukC/vscode-ext_flutter-clean-architecture/compare/v0.0.11...v0.0.12) (2019-11-26)


### Bug Fixes

* **path:** use path library to manipulate paths ([40dfbd1](https://github.com/KiritchoukC/vscode-ext_flutter-clean-architecture/commit/40dfbd1)), closes [#1](https://github.com/KiritchoukC/vscode-ext_flutter-clean-architecture/issues/1)

### [0.0.11](https://github.com/KiritchoukC/vscode-ext_flutter-clean-architecture/compare/v0.0.10...v0.0.11) (2019-10-31)

### [0.0.10](https://github.com/KiritchoukC/vscode-ext_flutter-clean-architecture/compare/v0.0.9...v0.0.10) (2019-10-28)

### [0.0.9](https://github.com/KiritchoukC/vscode-ext_flutter-clean-architecture/compare/v0.0.8...v0.0.9) (2019-10-28)

### [0.0.8](https://github.com/KiritchoukC/vscode-ext_flutter-clean-architecture/compare/v0.0.7...v0.0.8) (2019-10-27)

### [0.0.7](https://github.com/KiritchoukC/vscode-ext_flutter-clean-architecture/compare/v0.0.6...v0.0.7) (2019-10-27)


### Bug Fixes

* **fix changelox:** remove changelog boilerplate ([1dc6b26](https://github.com/KiritchoukC/vscode-ext_flutter-clean-architecture/commit/1dc6b26))

### [0.0.6](https://github.com/KiritchoukC/vscode-ext_flutter-clean-architecture/compare/v0.0.5...v0.0.6) (2019-10-27)


### Bug Fixes

* **fix ext desxcription:** fix typo into description's extension ([2ec6349](https://github.com/KiritchoukC/vscode-ext_flutter-clean-architecture/commit/2ec6349))

### [0.0.5](https://github.com/KiritchoukC/vscode-ext_flutter-clean-architecture/compare/v0.0.4...v0.0.5) (2019-10-27)

### [0.0.4](https://github.com/KiritchoukC/vscode-ext_flutter-clean-architecture/compare/v0.0.3...v0.0.4) (2019-10-27)

### [0.0.3](https://github.com/KiritchoukC/vscode-ext_flutter-clean-architecture/compare/v0.0.2...v0.0.3) (2019-10-27)

### 0.0.2 (2019-10-27)


### Features

* **edit bloc copy:** edit the bloc extension to add feature directories creation ([48fec6c](https://github.com/KiritchoukC/vscode-ext_flutter-clean-architecture/commit/48fec6c))