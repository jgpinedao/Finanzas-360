import React, { useState, useEffect } from 'react';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  PiggyBank, 
  CreditCard, 
  PlusCircle, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    }
  }, []);

  const [ingresos, setIngresos] = useState(498.15);
  const [gastos, setGastos] = useState(438.37);
  const [ahorro, setAhorro] = useState(59.78);

  const [deudas, setDeudas] = useState([
    { id: 1, nombre: 'Cashea PYD House', saldo: 9.65, estatus: 'Pendiente', fecha: '03-oct' },
    { id: 2, nombre: 'Krece Préstamo (Jose)', saldo: 0.00, estatus: 'Liquidado', fecha: '02-oct' },
    { id: 3, nombre: 'Condominio Acumulado', saldo: 264.02, estatus: 'Pendiente', fecha: '09-sep' },
    { id: 4, nombre: 'Cashea Damasco 1', saldo: 21.00, estatus: 'Pendiente', fecha: '04-jun' },
  ]);

  const toggleDeuda = (id) => {
    setDeudas(deudas.map(d => {
      if (d.id === id) {
        const nuevoEstatus = d.estatus === 'Pendiente' ? 'Liquidado' : 'Pendiente';
        return { ...d, estatus: nuevoEstatus };
      }
      return d;
    }));
  };

  return (
    <div className="max-w-md mx-auto min-h-screen pb-20 px-4 pt-6 bg-slate-900 text-slate-100">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <div>
          <p className="text-xs text-slate-400 font-medium">Control Económico</p>
          <h1 className="text-xl font-bold text-white">Septiembre 2026</h1>
        </div>
        <div className="bg-slate-800 p-2 rounded-full border border-slate-700">
          <Wallet className="w-5 h-5 text-emerald-400" />
        </div>
      </header>

      {/* Tarjetas Resumen */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/50">
          <div className="flex items-center gap-2 mb-1 text-emerald-400">
            <ArrowUpRight className="w-4 h-4" />
            <span className="text-xs font-semibold">Ingresos</span>
          </div>
          <p className="text-xl font-bold">${ingresos.toFixed(2)}</p>
        </div>

        <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/50">
          <div className="flex items-center gap-2 mb-1 text-rose-400">
            <ArrowDownRight className="w-4 h-4" />
            <span className="text-xs font-semibold">Egresos</span>
          </div>
          <p className="text-xl font-bold">${gastos.toFixed(2)}</p>
        </div>
      </div>

      {/* Ahorro */}
      <div className="bg-gradient-to-r from-fuchsia-900/40 to-pink-900/40 p-4 rounded-2xl border border-fuchsia-500/30 mb-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-fuchsia-500/20 p-3 rounded-xl">
            <PiggyBank className="w-6 h-6 text-fuchsia-400" />
          </div>
          <div>
            <p className="text-xs text-fuchsia-300 font-medium">Ahorro (12%)</p>
            <p className="text-lg font-bold text-white">${ahorro.toFixed(2)}</p>
          </div>
        </div>
        <span className="text-xs bg-fuchsia-500/20 text-fuchsia-300 px-2.5 py-1 rounded-full font-medium border border-fuchsia-500/30">
          Binance
        </span>
      </div>

      {/* Pestañas */}
      <div className="flex bg-slate-800/60 p-1 rounded-xl mb-6 border border-slate-700/50">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'dashboard' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400'
          }`}
        >
          Flujo de Caja
        </button>
        <button 
          onClick={() => setActiveTab('deudas')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'deudas' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400'
          }`}
        >
          Plan Deudas
        </button>
      </div>

      {/* Deudas */}
      {activeTab === 'deudas' && (
        <section className="space-y-3">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-semibold text-slate-300">Compromisos y Cuotas</h2>
            <span className="text-xs text-slate-500">{deudas.length} Registros</span>
          </div>

          {deudas.map((item) => (
            <div 
              key={item.id} 
              onClick={() => toggleDeuda(item.id)}
              className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/40 flex justify-between items-center cursor-pointer hover:bg-slate-800 transition-all"
            >
              <div className="flex items-center gap-3">
                <CreditCard className={`w-5 h-5 ${item.estatus === 'Liquidado' ? 'text-emerald-400' : 'text-amber-400'}`} />
                <div>
                  <p className="text-sm font-medium text-slate-200">{item.nombre}</p>
                  <p className="text-xs text-slate-500">Corte: {item.fecha}</p>
                </div>
              </div>

              <div className="text-right flex items-center gap-3">
                <div>
                  <p className="text-sm font-bold text-white">${item.saldo.toFixed(2)}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold inline-block ${
                    item.estatus === 'Liquidado' 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  }`}>
                    {item.estatus}
                  </span>
                </div>
                {item.estatus === 'Liquidado' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Clock className="w-5 h-5 text-slate-600" />
                )}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Flujo de caja */}
      {activeTab === 'dashboard' && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-300 mb-2">Egresos Recientes</h2>
          
          <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/30 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-slate-200">Mercado Prestado</p>
              <p className="text-xs text-slate-500">15 Sep • Mercado</p>
            </div>
            <p className="text-sm font-bold text-rose-400">-$170.00</p>
          </div>

          <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/30 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-slate-200">Pago Primera Cuota</p>
              <p className="text-xs text-slate-500">15 Sep • Deuda Krece</p>
            </div>
            <p className="text-sm font-bold text-rose-400">-$36.00</p>
          </div>
        </section>
      )}

      <button className="fixed bottom-6 right-6 bg-emerald-500 hover:bg-emerald-600 text-slate-950 p-3.5 rounded-full shadow-lg shadow-emerald-500/20 font-bold flex items-center gap-2 transition-all">
        <PlusCircle className="w-6 h-6" />
      </button>
    </div>
  );
}
