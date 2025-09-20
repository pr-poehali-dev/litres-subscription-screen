import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import ProgressCalculator from '@/components/ProgressCalculator';



const Index = () => {
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

        {/* БЛОК 3: Калькулятор и тарифы */}
        <ProgressCalculator />
      </div>


    </div>
  );
};

export default Index;