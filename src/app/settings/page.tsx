"use client";

import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Switch } from "@headlessui/react";
import { SunIcon, StarIcon, BellIcon } from "@heroicons/react/24/solid";

interface Settings {
  currency: string;
  theme: "light" | "dark";
  notifications: boolean;
  favorites: string[];
}

export default function Settings() {
  const [cookies, setCookie] = useCookies(["settings"]);
  const [settings, setSettings] = useState<Settings>({
    currency: "USD",
    theme: "light",
    notifications: false,
    favorites: [],
  });

  // Efecto inicial para cargar configuración
  useEffect(() => {
    const savedSettings = cookies.settings || {
      currency: "USD",
      theme: "light",
      notifications: false,
      favorites: [],
    };

    setSettings(savedSettings);
    document.documentElement.classList.toggle(
      "dark",
      savedSettings.theme === "dark"
    );
  }, []);

  // Manejar cambios de configuración
  const updateSettings = (newSettings: Partial<Settings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    setCookie("settings", updated, { path: "/" });

    if (newSettings.theme) {
      document.documentElement.classList.toggle(
        "dark",
        newSettings.theme === "dark"
      );
    }
  };

  return (
    <div className="p-5">
      <div className="w-full">
        <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-white flex items-center gap-3">
          <div className="p-3 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            ⚙️
          </div>
          Configuración
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tarjeta de Apariencia */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-700 dark:text-gray-200">
              <SunIcon className="w-6 h-6 text-yellow-500" />
              Apariencia
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-100/50 dark:bg-gray-700/50 rounded-xl">
                <span className="text-gray-600 dark:text-gray-300">
                  Tema Oscuro
                </span>
                <Switch
                  checked={settings.theme === "dark"}
                  onChange={(checked: boolean) =>
                    updateSettings({ theme: checked ? "dark" : "light" })
                  }
                  className={`${
                    settings.theme === "dark" ? "bg-blue-500" : "bg-gray-300"
                  } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                >
                  <span className="sr-only">Toggle dark mode</span>
                  <span
                    className={`${
                      settings.theme === "dark"
                        ? "translate-x-6"
                        : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                  />
                </Switch>
              </div>

              <div className="p-4 bg-gray-100/50 dark:bg-gray-700/50 rounded-xl">
                <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
                  Moneda Principal
                </label>
                <select
                  value={settings.currency}
                  onChange={(e) => updateSettings({ currency: e.target.value })}
                  className="w-full bg-transparent border-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                >
                  {["USD", "EUR", "GBP", "JPY"].map((currency) => (
                    <option
                      key={currency}
                      value={currency}
                      className="dark:bg-gray-800"
                    >
                      {currency}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Tarjeta de Notificaciones */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-700 dark:text-gray-200">
              <BellIcon className="w-6 h-6 text-blue-500" />
              Notificaciones
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-100/50 dark:bg-gray-700/50 rounded-xl">
                <div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Alertas de Precio
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Recibir notificaciones push
                  </p>
                </div>
                <Switch
                  checked={settings.notifications}
                  onChange={(checked: boolean) =>
                    updateSettings({ notifications: checked })
                  }
                  className={`${
                    settings.notifications ? "bg-blue-500" : "bg-gray-300"
                  } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                >
                  <span className="sr-only">Enable notifications</span>
                  <span
                    className={`${
                      settings.notifications ? "translate-x-6" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                  />
                </Switch>
              </div>
            </div>
          </div>

          {/* Tarjeta de Favoritos */}
          <div className="lg:col-span-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-700 dark:text-gray-200">
              <StarIcon className="w-6 h-6 text-amber-500" />
              Monedas Favoritas
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {["BTC", "ETH", "BNB", "XRP", "ADA", "SOL"].map((coin) => (
                <button
                  key={coin}
                  onClick={() => {
                    const favorites = settings.favorites.includes(coin)
                      ? settings.favorites.filter((c) => c !== coin)
                      : [...settings.favorites, coin];
                    updateSettings({ favorites });
                  }}
                  className={`p-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
                    settings.favorites.includes(coin)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100/50 dark:bg-gray-700/50 hover:bg-gray-200/50 dark:hover:bg-gray-600/50"
                  }`}
                >
                  <span className="font-medium">{coin}</span>
                  <StarIcon
                    className={`w-4 h-4 ${
                      settings.favorites.includes(coin)
                        ? "text-amber-300"
                        : "text-gray-400"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
