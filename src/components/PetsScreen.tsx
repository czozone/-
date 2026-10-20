import React, { useState } from 'react';
import { PetProfile } from '../types';
import { MOCK_PETS } from '../data/mockData';

export const PetsScreen: React.FC = () => {
  const [pets, setPets] = useState<PetProfile[]>(MOCK_PETS);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newPetName, setNewPetName] = useState<string>('');
  const [newPetBreed, setNewPetBreed] = useState<string>('貴賓犬');
  const [newPetWeight, setNewPetWeight] = useState<string>('4.5');
  const [newPetAge, setNewPetAge] = useState<string>('2 歲');
  const [newPetTraits, setNewPetTraits] = useState<string>('親人安靜, 喜愛泡澡');

  const handleCreatePet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPetName.trim()) return;

    const newPet: PetProfile = {
      id: `pet-${Date.now()}`,
      name: newPetName,
      breed: newPetBreed,
      age: newPetAge,
      weight: parseFloat(newPetWeight) || 5.0,
      gender: '公',
      isNeutered: true,
      avatarUrl:
        'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80',
      traits: newPetTraits.split(',').map((t) => t.trim()),
      sensitiveNotes: '初次到店，請美容師先進行 10 分鐘嗅聞放鬆。',
      temperamentAlert: '適應中，建議低分貝吹風機。',
      vaccines: {
        rabies: true,
        combo: true,
        lastDate: '2024-08-01',
      },
      ownerName: '林小姐',
      ownerPhone: '0912-345-678',
      lineBound: true,
      preferredStyle: '日系自然短圓修毛',
    };

    setPets([newPet, ...pets]);
    setShowAddModal(false);
    setNewPetName('');
  };

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Title */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-on-surface">毛孩健康與照護檔案</h2>
          <p className="text-xs text-on-surface-variant">儲存性情敏感度、皮毛狀況與美容歷程</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-3.5 py-1.5 rounded-xl bg-primary text-white text-xs font-bold flex items-center gap-1 shadow-sm hover:opacity-95 transition-opacity cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          <span>新增毛孩</span>
        </button>
      </div>

      {/* Pet Profiles List */}
      <div className="space-y-4">
        {pets.map((pet) => (
          <div
            key={pet.id}
            className="bg-surface-container-lowest rounded-3xl p-4 shadow-[0_2px_12px_rgba(66,45,23,0.06)] border border-surface-container-high relative overflow-hidden"
          >
            <div className="flex items-start gap-3.5 mb-3">
              <img
                src={pet.avatarUrl}
                alt={pet.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-primary/20 shadow-sm flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-base text-on-surface">{pet.name}</h3>
                    <span className="bg-surface-container text-on-surface-variant text-[11px] font-bold px-2 py-0.5 rounded-full">
                      {pet.breed}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-primary">{pet.weight} kg</span>
                </div>
                <div className="text-xs text-on-surface-variant mb-1.5">
                  <span>年齡：{pet.age}</span> · <span>性別：{pet.gender}</span> ·{' '}
                  <span className="text-secondary font-medium">已絕育</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {pet.traits.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant text-[10px] font-bold"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Special Sensitivity & Grooming Tips */}
            <div className="space-y-2 text-xs pt-2 border-t border-surface-container">
              <div className="p-2.5 rounded-xl bg-tertiary-fixed/30 border border-tertiary/20 flex items-start gap-2">
                <span className="material-symbols-outlined text-tertiary text-[16px] flex-shrink-0 mt-0.5">
                  warning
                </span>
                <div>
                  <span className="font-bold text-tertiary block">性情與敏感提示</span>
                  <p className="text-on-surface-variant text-[11px] mt-0.5">{pet.temperamentAlert}</p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high flex items-start gap-2">
                <span className="material-symbols-outlined text-primary text-[16px] flex-shrink-0 mt-0.5">
                  spa
                </span>
                <div>
                  <span className="font-bold text-on-surface block">皮毛照護與偏好造型</span>
                  <p className="text-on-surface-variant text-[11px] mt-0.5">
                    {pet.preferredStyle || pet.sensitiveNotes}
                  </p>
                </div>
              </div>

              {/* Vaccine & Owner */}
              <div className="flex items-center justify-between text-[11px] text-on-surface-variant pt-1 px-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  <span>狂犬病/核心多合一疫苗效期內 (最後施打: {pet.vaccines.lastDate})</span>
                </div>
                <span className="font-semibold text-on-surface">飼主：{pet.ownerName}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Pet Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <form
            onSubmit={handleCreatePet}
            className="bg-surface-container-lowest w-full max-w-md rounded-3xl p-5 shadow-2xl border border-surface-container-high animate-in zoom-in-95"
          >
            <div className="flex items-center justify-between pb-3 border-b border-surface-container mb-3">
              <h3 className="font-bold text-base text-on-surface">新增毛孩檔案</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="w-7 h-7 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs mb-4">
              <div>
                <label className="font-bold text-on-surface block mb-1">毛孩暱稱</label>
                <input
                  type="text"
                  required
                  value={newPetName}
                  onChange={(e) => setNewPetName(e.target.value)}
                  placeholder="例如：波波、Cooper..."
                  className="w-full px-3 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/60 focus:border-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-on-surface block mb-1">品種</label>
                  <input
                    type="text"
                    value={newPetBreed}
                    onChange={(e) => setNewPetBreed(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/60 focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-on-surface block mb-1">體重 (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newPetWeight}
                    onChange={(e) => setNewPetWeight(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/60 focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-on-surface block mb-1">個性特質 (以逗號分隔)</label>
                <input
                  type="text"
                  value={newPetTraits}
                  onChange={(e) => setNewPetTraits(e.target.value)}
                  placeholder="例如：活潑, 怕大風量, 享受剪甲..."
                  className="w-full px-3 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/60 focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="flex-1 h-10 rounded-xl border border-surface-container-highest text-xs font-bold text-on-surface-variant hover:bg-surface-container cursor-pointer"
              >
                取消
              </button>
              <button
                type="submit"
                className="flex-1 h-10 rounded-xl bg-primary text-white text-xs font-bold shadow-sm hover:opacity-95 cursor-pointer"
              >
                確認新增
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
