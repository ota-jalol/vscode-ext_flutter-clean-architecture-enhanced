# Flutter Clean Architecture Extension - Enhanced Version

> ### Bu extension [KiritchoukC](https://github.com/KiritchoukC/vscode-ext_flutter-clean-architecture) ning asl loyihasidan fork olingan va kengaytirilgan versiyasidir.

**Ishlab chiqaruvchi:** OtaJalol

## 🚀 Yangi Imkoniyatlar

Bu kengaytirilgan versiyada quyidagi yangiliklar qo'shilgan:

- ✅ **Freezed Integration**: Immutable model va entity lar uchun Freezed kutubxonasi qo'llab-quvvatlanadi
- ✅ **Modern BLoC Pattern**: So'nggi BLoC 8.x versiyasi va zamonaviy state management
- ✅ **Complete File Generation**: 15+ fayl yaratiladi har bir feature uchun
- ✅ **Latest Dependencies**: Dio, Dartz, GetIt va boshqa zamonaviy kutubxonalar
- ✅ **Production Ready**: To'liq ishlaydigan kod shablonlari
- ✅ **Cubit Support Removed**: Faqat BLoC pattern qo'llab-quvvatlanadi (soddalik uchun)
- ✅ **Enhanced Error Handling**: Kengaytirilgan xatoliklar bilan ishlash
- ✅ **Dependency Injection**: GetIt bilan to'liq DI setup

## 📁 Yaratiluvchi Struktura

Extension har bir feature uchun quyidagi to'liq strukturani yaratadi:

```
features/
  feature_name/
    data/
      datasources/
        - feature_remote_data_source.dart    # Dio bilan HTTP so'rovlar
        - feature_local_data_source.dart     # SharedPreferences bilan caching
      models/
        - feature_model.dart                 # Freezed model + JSON serialization
      repositories/
        - feature_repository_impl.dart      # Repository implementation
    domain/
      entities/
        - feature.dart                       # Freezed entity
      repositories/
        - feature_repository.dart           # Abstract repository interface
      usecases/
        - get_feature.dart                  # Use case with Either error handling
    presentation/
      bloc/
        - feature_bloc.dart                 # Modern BLoC with comprehensive states
        - feature_event.dart                # Concrete events
        - feature_state.dart                # Multiple states (Empty, Loading, Loaded, Error)
      pages/
        - feature_page.dart                 # Complete page with BLoC integration
      widgets/
        - feature_display.dart              # Ma'lumot ko'rsatish widget
        - feature_controls.dart             # Input controls
        - loading_widget.dart               # Loading indicator
        - message_display.dart              # Xabar ko'rsatish widget

core/
  error/
    - failures.dart                         # Failure turlari
    - exceptions.dart                       # Exception turlari
  network/
    - network_info.dart                     # Internet ulanishini tekshirish
  usecases/
    - usecase.dart                          # UseCase base class

injection_container.dart                    # GetIt dependency injection
```

## 🛠️ Zamonaviy Texnologiyalar

Extension quyidagi so'nggi kutubxonalarni qo'llab-quvvatlaydi:

- **State Management**: BLoC 8.1.6, flutter_bloc 8.1.6
- **Functional Programming**: Dartz 0.10.1 (Either, Option types)
- **Code Generation**: Freezed 2.4.7, json_annotation 4.8.1
- **HTTP Client**: Dio 5.4.0
- **Local Storage**: shared_preferences 2.2.2
- **Dependency Injection**: get_it 7.6.4
- **Network Status**: connectivity_plus 5.0.2
- **Testing**: bloc_test 9.1.7, mockito 5.4.4

## 📥 O'rnatish

### VS Code Marketplace orqali
Bu extension VS Code Marketplace da mavjud emas, lekin siz uni qo'lda o'rnatishingiz mumkin.

### Qo'lda o'rnatish
1. Repository ni clone qiling yoki ZIP fayl sifatida yuklab oling
2. Terminal orqali papkaga kiring
3. Quyidagi buyruqlarni bajaring:

```bash
npm install
npm run compile
```

4. F5 tugmasini bosing yoki Run -> Start Debugging ni tanlang
5. Yangi VS Code oynasi ochiladi extension bilan

## 🎯 Foydalanish

### Command Palette orqali
1. `Ctrl+Shift+P` (Windows/Linux) yoki `Cmd+Shift+P` (Mac) bosing
2. "Flutter Clean Architecture: New Feature" ni yozing va Enter bosing
3. Feature nomini kiriting (masalan: "counter", "authentication")
4. Extension to'liq feature strukturasini yaratadi

### Context Menu orqali
1. Flutter loyihasidagi istalgan papkada o'ng tugmani bosing
2. "Flutter Clean Architecture: New Feature" ni tanlang
3. Feature nomini kiriting
4. To'liq feature strukturasi yaratiladi

## 🏗️ Clean Architecture Qatlamlari

### Domain Layer (Biznes Mantig'i)
- **Entities**: Freezed bilan immutable data classlar
- **Repositories**: Abstract interfacelar
- **Use Cases**: Either bilan error handling

### Data Layer (Ma'lumotlar)
- **Models**: JSON serialization bilan
- **Repositories**: Concrete implementationlar
- **Data Sources**: Remote (Dio) va Local (SharedPreferences)

### Presentation Layer (UI)
- **BLoC**: Zamonaviy state management
- **Pages**: To'liq sahifalar BLoC integration bilan
- **Widgets**: Qayta ishlatiluvchi UI componentlar

## 🔧 Generatsiya Qilinadigan Kod Namunalari

### Entity (Freezed)
```dart
@freezed
class Counter with _$Counter {
  const factory Counter({
    required int id,
    required String name,
  }) = _Counter;
}
```

### Repository Implementation
```dart
class CounterRepositoryImpl implements CounterRepository {
  final CounterRemoteDataSource remoteDataSource;
  final CounterLocalDataSource localDataSource;
  final NetworkInfo networkInfo;

  // To'liq implementation...
}
```

### BLoC with Modern Patterns
```dart
class CounterBloc extends Bloc<CounterEvent, CounterState> {
  final GetCounter getCounter;

  CounterBloc({required this.getCounter}) : super(Empty()) {
    on<GetCounterForId>(_onGetCounterForId);
    on<GetRandomCounter>(_onGetRandomCounter);
  }
  
  // Event handlerlar...
}
```

## 📊 Dependency Analysis

Extension avtomatik ravishda quyidagi dependency larni tekshiradi va yangilash taklif qiladi:

- bloc, flutter_bloc
- freezed, json_annotation
- dio, dartz
- get_it, shared_preferences
- connectivity_plus
- Testing kutubxonalari

## 🤝 Hissa Qo'shish

Bu loyiha ochiq manba hisoblanadi. Hissa qo'shish uchun:

1. Repository ni fork qiling
2. O'zgarishlarni bajaring
3. Pull request yuboring

## 📜 Litsenziya

MIT License

## 🙏 Minnatdorchilik

- Asl loyiha [KiritchoukC](https://github.com/KiritchoukC/vscode-ext_flutter-clean-architecture) tomonidan yaratilgan
- [ResoCoder](https://github.com/ResoCoder) ning Clean Architecture tutorial dan ilhomlangan
- [Felix Angelov](https://github.com/felangel) ning BLoC kutubxonasidan foydalanilgan

## 📞 Bog'lanish

Savollar yoki takliflar bo'lsa, GitHub Issues orqali murojaat qiling.

---

**OtaJalol tomonidan rivojlantirilgan 🇺🇿**
