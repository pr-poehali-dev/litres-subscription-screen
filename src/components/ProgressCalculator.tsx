import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
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

const ProgressCalculator = () => {
  const [minutesPerDay, setMinutesPerDay] = useState([30]);
  const [progress, setProgress] = useState(calculateProgress(30));
  const [selectedPlan, setSelectedPlan] = useState(0);

  useEffect(() => {
    setProgress(calculateProgress(minutesPerDay[0]));
  }, [minutesPerDay]);

  const plans = [
    { 
      months: 1, 
      price: "399 ₽", 
      originalPrice: null,
      discount: null,
      perMonth: "333 ₽ за месяц",
      logo: "📚"
    },
    { 
      months: 3, 
      price: "999 ₽", 
      originalPrice: "1 197 ₽",
      discount: "-17%",
      perMonth: "333 ₽ за месяц",
      logo: "📚"
    },
    { 
      months: 6, 
      price: "1 890 ₽", 
      originalPrice: "2 394 ₽",
      discount: "-21%",
      perMonth: "315 ₽ за месяц",
      logo: "📚"
    },
    { 
      months: 12, 
      price: "3 190 ₽", 
      originalPrice: "4 788 ₽",
      discount: "-33%",
      perMonth: "266 ₽ за месяц",
      logo: "📚"
    }
  ];

  return (
    <div className="space-y-16">
      {/* Калькулятор прогресса */}
      <section className="animate-fade-in">
        <Card className="max-w-4xl mx-auto shadow-xl border-0 bg-gradient-to-br from-purple-600 to-purple-800 text-white">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold mb-4">
              Ваш прогресс вместе с Литрес
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <label className="text-lg font-medium block">
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
              <div className="flex justify-between text-sm opacity-80">
                <span>15 мин</span>
                <span>90 мин</span>
              </div>
            </div>
            
            <div className="text-center space-y-4">
              <div className="text-4xl font-bold">
                ≈ {progress.booksPerMonth} книг в месяц
              </div>
              <div className="text-xl opacity-80">
                (≈ {progress.hoursPerMonth} ч)
              </div>
              <p className="text-sm opacity-70 max-w-md mx-auto">
                Модель: 5 будних дней, скорость 1.25×, средняя аудиокнига ~8 ч
              </p>
            </div>

            <div className="text-center">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg rounded-full">
                Попробовать бесплатно
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Выбор тарифа */}
      <section className="animate-fade-in bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Выберите период
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Для новых пользователей подписки первый месяц бесплатно
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const periodProgress = progress.periods[index];
            const isSelected = selectedPlan === index;
            return (
              <Card 
                key={index} 
                className={`relative overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer animate-slide-up border-2 ${
                  plan.discount === "-33%" 
                    ? 'border-orange-400 bg-white shadow-xl' 
                    : isSelected
                    ? 'border-purple-400 bg-white shadow-lg'
                    : 'border-gray-200 bg-white hover:border-purple-300'
                }`}
                style={{animationDelay: `${index * 0.1}s`}}
                onClick={() => setSelectedPlan(index)}
              >
                {/* Радио кнопка */}
                <div className="absolute top-4 left-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    isSelected ? 'border-purple-500 bg-purple-500' : 'border-gray-300'
                  }`}>
                    {isSelected && <div className="w-3 h-3 rounded-full bg-white"></div>}
                  </div>
                </div>

                {/* Скидка */}
                {plan.discount && (
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-2 py-1 text-xs font-bold rounded">
                    {plan.discount}
                  </div>
                )}

                <CardContent className="pt-12 pb-6 text-center space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      {plan.months} {plan.months === 1 ? 'месяц' : plan.months < 5 ? 'месяца' : 'месяцев'}
                    </h3>
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-gray-900">
                        за {plan.price}
                      </div>
                      {plan.originalPrice && (
                        <div className="text-sm text-gray-500 line-through">
                          {plan.originalPrice}
                        </div>
                      )}
                      <div className="text-sm text-gray-600">
                        {plan.perMonth}
                      </div>
                    </div>
                  </div>

                  {/* Прогресс по книгам */}
                  <div className="py-4 px-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-purple-700 mb-1">
                      ≈ {periodProgress.books} книг
                    </div>
                    <div className="text-sm text-gray-600">
                      (≈ {periodProgress.hours} часов)
                    </div>
                  </div>

                  {/* Логотип Литрес */}
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <span className="text-lg">{plan.logo}</span>
                    <span>литрес</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white px-12 py-4 text-lg rounded-full font-semibold">
            Попробовать первый месяц бесплатно
          </Button>
          <div className="mt-4 space-y-1">
            <p className="text-sm text-gray-600">
              Далее 399 ₽ в месяц.
            </p>
            <p className="text-xs text-gray-500">
              Продление автоматическое, отменить можно в любой момент
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgressCalculator;