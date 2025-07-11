import React from "react";

const clients = [
  { name: "MetroMall", icon: "🏢" },
  { name: "SecureBank", icon: "🛡️" },
  { name: "EventGuard", icon: "🎤" },
  { name: "HomeSafe", icon: "🏠" },
  { name: "BuildCo", icon: "🏗️" }
];

export default function Clients() {
  return (
    <section className="bg-[#0A0F24] px-8 py-12 border-t border-gray-800">
      <div className="flex justify-center gap-8 flex-wrap">
        {clients.map((client, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition"
          >
            <span className="text-xl">{client.icon}</span>
            <span>{client.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
