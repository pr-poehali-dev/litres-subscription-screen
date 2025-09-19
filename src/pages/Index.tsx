import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const WEEKDAYS = 5;
const WEEKS_PER_MONTH = 4.3;
const SPEED = 1.25;
const BOOK_HOURS = 8;

const calculateProgress = (minutesPerDay: number) => {
  const hoursPerMonth = (minutesPerDay / 60) * WEEKDAYS * WEEKS_PER_MONTH * SPEED;
  const hoursPerPeriod = (months: number) => hoursPerMonth * months;
  const booksPerPeriod = (months: number) => Math.round(hoursPerPeriod(months) / BOOK_HOURS);
  
  return {
    hoursPerMonth: Math.round(hoursPerMonth * 10) / 10,
    booksPerMonth: booksPerPeriod(1),
    periods: [
      { months: 1, books: booksPerPeriod(1), hours: Math.round(hoursPerPeriod(1) * 10) / 10 },
      { months: 3, books: booksPerPeriod(3), hours: Math.round(hoursPerPeriod(3) * 10) / 10 },
      { months: 6, books: booksPerPeriod(6), hours: Math.round(hoursPerPeriod(6) * 10) / 10 },
      { months: 12, books: booksPerPeriod(12), hours: Math.round(hoursPerPeriod(12) * 10) / 10 }
    ]
  };
};

const BookCover = ({ title, author, color }: { title: string; author: string; color: string }) => (
  <div className={`w-16 h-20 ${color} rounded-lg shadow-lg flex-shrink-0 p-2 text-white text-xs flex flex-col justify-between`}>
    <div className="font-semibold leading-tight">{title}</div>
    <div className="opacity-80">{author}</div>
  </div>
);

const BookShelf = ({ books }: { books: Array<{ title: string; author: string; color: string }> }) => (
  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
    {books.map((book, index) => (
      <BookCover key={index} {...book} />
    ))}
  </div>
);

const professionalBooks = [
  { title: "Управление проектами", author: "PMI", color: "bg-coral" },
  { title: "Лидерство", author: "Кови", color: "bg-turquoise" },
  { title: "Аналитика", author: "Дамодаран", color: "bg-blue-bright" },
  { title: "Маркетинг", author: "Котлер", color: "bg-orange-bright" },
  { title: "Финансы", author: "Грэм", color: "bg-coral-dark" },
  { title: "Стратегия", author: "Портер", color: "bg-turquoise-dark" }
];

const Index = () => {
  const [minutesPerDay, setMinutesPerDay] = useState([30]);
  const [progress, setProgress] = useState(calculateProgress(30));
  const [selectedPlan, setSelectedPlan] = useState(3); // 12 months by default

  useEffect(() => {
    setProgress(calculateProgress(minutesPerDay[0]));
  }, [minutesPerDay]);

  const plans = [
    { 
      months: 1, 
      price: 399, 
      pricePerMonth: 399,
      title: "1 месяц — 399 ₽",
      benefits: [
        "Настроены офлайн-загрузки и автопродолжение",
        "Найден рабочий темп 1.25×; короткая очередь релевантных книг",
        "1–2 применимые идеи в работе"
      ]
    },
    { 
      months: 3, 
      price: 999, 
      pricePerMonth: 333,
      title: "3 месяца — 999 ₽",
      benefits: [
        "Привычка «дорога = обучение» на ≥80% будних дней",
        "Выбран пул авторов/серий; меньше времени на выбор",
        "Внедрены 2–3 практики на работе"
      ]
    },
    { 
      months: 6, 
      price: 1890, 
      pricePerMonth: 315,
      title: "6 месяцев — 1 890 ₽",
      benefits: [
        "Закрыт фундамент по 2–3 направлениям",
        "Конспекты/цитаты; внедрено 5+ идей с заметным эффектом"
      ]
    },
    { 
      months: 12, 
      price: 3190, 
      pricePerMonth: 266,
      title: "12 месяцев — 3 190 ₽",
      benefits: [
        "Система из подписок на авторов/серии и готовых плейлистов",
        "Закрыты «длинные» темы; внедрено 10+ практик, годовой обзор результатов"
      ],
      recommended: true
    }
  ];

  const features = [
    {
      icon: "Download",
      title: "Офлайн-скачивание книг и аудио",
      description: "Загружайте контент заранее"
    },
    {
      icon: "Play",
      title: "Мгновенное продолжение с последнего места",
      description: "Синхронизация между устройствами"
    },
    {
      icon: "RefreshCw",
      title: "Переключение «текст ↔ аудио»",
      description: "Со сквозной синхронизацией"
    },
    {
      icon: "Clock",
      title: "Управление временем",
      description: "Скорость и таймер сна"
    },
    {
      icon: "Search",
      title: "Поиск и рекомендации",
      description: "Фильтры, подборки, персонализация"
    },
    {
      icon: "Target",
      title: "Цели и статистика",
      description: "Отслеживание прогресса чтения"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-coral-50">
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        
        {/* БЛОК 1: Оффер для сегмента */}
        <section className="animate-fade-in">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-navy leading-tight">
                Литрес помогает использовать дорогу для изучения профильной литературы
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Чтобы вы повышали должностной уровень и доход, за счёт того, что продукт будет:
              </p>
              <div className="space-y-4">
                {[
                  "Давать офлайн-доступ к заранее скачанной аудиокниге",
                  "Автоматически продолжать с последней позиции",
                  "Позволять регулировать скорость прослушивания",
                  "Переключать формат книги между аудио и текстом без потери места",
                  "Показывать статистику прослушивания по дням и неделям"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                    <div className="w-6 h-6 rounded-full bg-coral flex items-center justify-center flex-shrink-0 mt-1">
                      <Icon name="Check" size={14} className="text-white" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:pl-8">
              <img 
                src="/img/0b075739-2ffa-42af-808e-ad3188156723.jpg" 
                alt="Профессиональные аудиокниги" 
                className="w-full rounded-2xl shadow-2xl animate-scale-in"
              />
            </div>
          </div>
        </section>

        {/* БЛОК 2: Что входит в Подписку */}
        <section className="animate-fade-in">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">Что входит в Подписку</h2>
            <BookShelf books={professionalBooks} />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105 animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-coral to-turquoise flex items-center justify-center flex-shrink-0">
                      <Icon name={feature.icon} size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy mb-2">{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* БЛОК 3: Интерактивный калькулятор */}
        <section className="animate-fade-in">
          <Card className="max-w-4xl mx-auto shadow-xl border-0 bg-gradient-to-r from-turquoise/5 to-blue-bright/5">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold text-navy mb-4">
                Ваш прогресс вместе с Литрес
              </CardTitle>
              <Badge variant="secondary" className="text-lg px-4 py-2 bg-coral/10 text-coral border-coral/20">
                Если вы читаете {minutesPerDay[0]} минут в день
              </Badge>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <label className="text-lg font-medium text-navy block">
                  Время чтения в день: {minutesPerDay[0]} минут
                </label>
                <Slider
                  value={minutesPerDay}
                  onValueChange={setMinutesPerDay}
                  min={15}
                  max={90}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>15 мин</span>
                  <span>90 мин</span>
                </div>
              </div>
              
              <div className="text-center space-y-4">
                <div className="text-4xl font-bold text-navy">
                  ≈ {progress.booksPerMonth} книг в месяц
                </div>
                <div className="text-xl text-gray-600">
                  (≈ {progress.hoursPerMonth} ч)
                </div>
                <p className="text-sm text-gray-500 max-w-md mx-auto">
                  Модель: 5 будних дней, скорость 1.25×, средняя аудиокнига ~8 ч
                </p>
              </div>

              <div className="text-center">
                <Button size="lg" className="bg-gradient-to-r from-coral to-coral-dark hover:from-coral-dark hover:to-coral text-white px-8 py-3 text-lg">
                  Попробовать подписку
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* БЛОК 4: Цена и прогресс */}
        <section className="animate-fade-in">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">
              Выберите период и посмотрите ожидаемый прогресс
            </h2>
            <Badge variant="secondary" className="text-lg px-4 py-2 bg-turquoise/10 text-turquoise border-turquoise/20">
              Для новых пользователей первый месяц — 0 ₽
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, index) => {
              const periodProgress = progress.periods[index];
              return (
                <Card 
                  key={index} 
                  className={`relative overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer animate-slide-up ${
                    plan.recommended 
                      ? 'ring-2 ring-coral shadow-xl bg-gradient-to-br from-coral/5 to-turquoise/5' 
                      : 'hover:shadow-lg'
                  }`}
                  style={{animationDelay: `${index * 0.1}s`}}
                  onClick={() => setSelectedPlan(index)}
                >
                  {plan.recommended && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-coral to-turquoise text-white px-3 py-1 text-xs font-semibold">
                      ВЫГОДНО
                    </div>
                  )}
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold text-navy">
                      {plan.title}
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      ≈ {plan.pricePerMonth} ₽/мес
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-xl font-bold text-coral mb-2">
                        ≈ {periodProgress.books} книг
                      </div>
                      <div className="text-sm text-gray-600">
                        (≈ {periodProgress.hours} часов)
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {plan.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-start gap-2">
                          <div className="w-4 h-4 rounded-full bg-turquoise flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Icon name="Check" size={10} className="text-white" />
                          </div>
                          <span className="text-sm text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 mb-4">
              Оценка ориентировочная. На результаты влияет фактическое время в дороге и сложность книг.
            </p>
          </div>
        </section>

        {/* Аналитика прогресса */}
        <section className="animate-fade-in">
          <Card className="max-w-4xl mx-auto shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-navy text-center">
                Детальная аналитика прогресса
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-coral to-coral-dark flex items-center justify-center mx-auto animate-pulse-glow">
                    <Icon name="BookOpen" size={24} className="text-white" />
                  </div>
                  <div className="text-2xl font-bold text-coral">
                    {progress.booksPerMonth * 12}
                  </div>
                  <div className="text-sm text-gray-600">книг в год</div>
                </div>
                
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-turquoise to-turquoise-dark flex items-center justify-center mx-auto animate-pulse-glow">
                    <Icon name="Clock" size={24} className="text-white" />
                  </div>
                  <div className="text-2xl font-bold text-turquoise">
                    {Math.round(progress.hoursPerMonth * 12)}
                  </div>
                  <div className="text-sm text-gray-600">часов обучения</div>
                </div>
                
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-bright to-blue-dark flex items-center justify-center mx-auto animate-pulse-glow">
                    <Icon name="TrendingUp" size={24} className="text-white" />
                  </div>
                  <div className="text-2xl font-bold text-blue-bright">
                    85%
                  </div>
                  <div className="text-sm text-gray-600">эффективность</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Прогресс за месяц</span>
                  <span className="text-sm text-gray-600">{Math.round((progress.hoursPerMonth / (8 * progress.booksPerMonth)) * 100)}%</span>
                </div>
                <Progress value={Math.round((progress.hoursPerMonth / (8 * progress.booksPerMonth)) * 100)} className="h-3" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Формирование привычки</span>
                  <span className="text-sm text-gray-600">78%</span>
                </div>
                <Progress value={78} className="h-3" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Внедрение идей</span>
                  <span className="text-sm text-gray-600">65%</span>
                </div>
                <Progress value={65} className="h-3" />
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Фиксированная кнопка на мобильных */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t lg:hidden">
        <Button className="w-full bg-gradient-to-r from-coral to-coral-dark hover:from-coral-dark hover:to-coral text-white">
          Оформить подписку
        </Button>
      </div>
    </div>
  );
};

export default Index;