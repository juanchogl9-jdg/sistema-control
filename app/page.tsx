'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient'; // Conexión a tu BD

export default function Dashboard() {
const [organizations, setOrganizations] = useState<any[]>([]);
const [selectedOrg, setSelectedOrg] = useState<any>(null);
const [controls, setControls] = useState<any[]>([]);

  // Cargar organizaciones autorizadas para el usuario
  useEffect(() => {
    async function fetchOrganizations() {
      const { data, error } = await supabase
        .from('organizations')
        .select(`id, name, user_roles!inner(user_id)`);
      if (data) setOrganizations(data);
    }
    fetchOrganizations();
  }, []);

  // Cargar catálogo de controles (Parte A del MVP)
  useEffect(() => {
    async function fetchControls() {
      const { data } = await supabase.from('fraud_controls_catalog').select('*');
      if (data) setControls(data);
    }
    fetchControls();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-gray-800">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900">Sistema Integral de Control Interno</h1>
        <p className="text-gray-600">Módulo de Diagnóstico Antifraude (MVP)</p>
      </header>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">Seleccionar Organización Cliente:</label>
        <select 
          className="w-full border-gray-300 rounded-md p-2 border"
          onChange={(e) => setSelectedOrg(e.target.value)}
        >
          <option value="">-- Selecciona una empresa --</option>
          {organizations.map(org => (
            <option key={org.id} value={org.id}>{org.name}</option>
          ))}
        </select>
      </div>

      {selectedOrg && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Cuestionario Guiado Antifraude</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border-b">Proceso</th>
                <th className="p-3 border-b">Control</th>
                <th className="p-3 border-b">¿Existe y Funciona?</th>
                <th className="p-3 border-b">Verificación</th>
                <th className="p-3 border-b">Brecha / Acción</th>
              </tr>
            </thead>
            <tbody>
              {controls.map(control => (
                <tr key={control.id} className="hover:bg-gray-50">
                  <td className="p-3 border-b font-medium">{control.process_area}</td>
                  <td className="p-3 border-b text-sm">{control.control_name}</td>
                  <td className="p-3 border-b text-center">
                    <input type="checkbox" className="h-5 w-5 text-blue-600" />
                  </td>
                  <td className="p-3 border-b">
                    <select className="border p-1 rounded w-full text-sm">
                      <option>Declarado</option>
                      <option>Verificado en Sistema</option>
                    </select>
                  </td>
                  <td className="p-3 border-b">
                    <input type="text" placeholder="Describir hallazgo..." className="border p-1 w-full text-sm rounded" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="mt-6 bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition">
            Guardar Diagnóstico
          </button>
        </div>
      )}
    </div>
  );
}