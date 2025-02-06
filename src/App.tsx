import React, { useState } from 'react';
import { User, Activity, Droplet, Heart, Plus, Phone, AlertCircle, ChevronRight, Search, Ambulance, Brain, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// More realistic data with slight variations
const generatePatientData = (baseHR: number) => [
  { time: '00:00', spo2: 98, saline: 100, heartRate: baseHR + Math.random() * 5 },
  { time: '04:00', spo2: 97, saline: 85, heartRate: baseHR + Math.random() * 5 },
  { time: '08:00', spo2: 99, saline: 70, heartRate: baseHR + Math.random() * 5 },
  { time: '12:00', spo2: 98, saline: 55, heartRate: baseHR + Math.random() * 5 },
  { time: '16:00', spo2: 96, saline: 40, heartRate: baseHR + Math.random() * 5 },
  { time: '20:00', spo2: 97, saline: 25, heartRate: baseHR + Math.random() * 5 },
].map(item => ({
  ...item,
  heartRate: Math.round(item.heartRate),
  spo2: Math.max(95, Math.min(100, item.spo2 + (Math.random() * 2 - 1))),
}));

const patients = [
  {
    id: 1,
    name: "Rajesh Kumar",
    gender: "Male",
    condition: "Post-surgery Recovery",
    age: 45,
    height: "175 cm",
    weight: "70 kg",
    deviceId: "MD-123456789",
    data: generatePatientData(72),
    status: "stable",
    contact: "+91 98765 43210",
    mentalStatus: "Stable",
    lastAssessment: "2024-03-15"
  },
  {
    id: 2,
    name: "Priya Sharma",
    gender: "Female",
    condition: "Cardiac Monitoring",
    age: 32,
    height: "165 cm",
    weight: "65 kg",
    deviceId: "MD-987654321",
    data: generatePatientData(78),
    status: "attention",
    contact: "+91 87654 32109",
    mentalStatus: "Mild Anxiety",
    lastAssessment: "2024-03-14",
    menstrualData: {
      lastPeriod: "2024-03-01",
      cycleLength: 28,
      nextPeriod: "2024-03-29",
      symptoms: ["Mild cramps", "Fatigue"],
      flow: "Moderate"
    }
  },
  {
    id: 3,
    name: "Amit Patel",
    gender: "Male",
    condition: "Diabetes Management",
    age: 53,
    height: "180 cm",
    weight: "82 kg",
    deviceId: "MD-456789123",
    data: generatePatientData(68),
    status: "stable",
    contact: "+91 76543 21098",
    mentalStatus: "Good",
    lastAssessment: "2024-03-13"
  }
];

function App() {
  const [selectedPatient, setSelectedPatient] = useState(patients[0]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const handleEmergencyCall = (contact: string) => {
    alert(`Initiating emergency call to ${contact}`);
  };

  const handleAmbulanceCall = () => {
    alert(`Dispatching ambulance to patient's location. Emergency services will be notified.`);
  };

  const handleAddPatient = () => {
    alert("Opening patient registration form");
  };

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`bg-white w-80 shadow-lg flex-shrink-0 ${sidebarOpen ? '' : 'hidden'}`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">Mavex</span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <ChevronRight className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search patients..."
              className="w-full px-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          {/* Add Patient Button */}
          <button
            onClick={handleAddPatient}
            className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 flex items-center justify-center mb-6 hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Patient
          </button>

          {/* Patient List */}
          <div className="space-y-2">
            {filteredPatients.map((patient) => (
              <button
                key={patient.id}
                onClick={() => setSelectedPatient(patient)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedPatient.id === patient.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    <span className="font-medium">{patient.name}</span>
                  </div>
                  {patient.status === 'attention' && (
                    <AlertCircle className="h-5 w-5 text-yellow-500" />
                  )}
                </div>
                <div className="text-sm text-gray-500 ml-7">{patient.condition}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className={`lg:hidden ${sidebarOpen ? 'hidden' : ''}`}
              >
                <ChevronRight className="h-6 w-6 text-gray-500 transform rotate-180" />
              </button>
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-900">
                  Patient Dashboard - {selectedPatient.name}
                </h1>
              </div>
              {/* Emergency Actions */}
              <div className="flex space-x-4">
                <button
                  onClick={() => handleEmergencyCall(selectedPatient.contact)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-red-700 transition-colors"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Emergency Call
                </button>
                <button
                  onClick={handleAmbulanceCall}
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-orange-600 transition-colors"
                >
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Call Ambulance
                </button>
                <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-yellow-600 transition-colors">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  SOS Alert
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Patient Info Card */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-6">
                  <User className="h-6 w-6 text-blue-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Patient Information</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{selectedPatient.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gender:</span>
                    <span className="font-medium">{selectedPatient.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Medical Condition:</span>
                    <span className="font-medium">{selectedPatient.condition}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Age:</span>
                    <span className="font-medium">{selectedPatient.age}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Height:</span>
                    <span className="font-medium">{selectedPatient.height}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Weight:</span>
                    <span className="font-medium">{selectedPatient.weight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Device ID:</span>
                    <span className="font-medium">{selectedPatient.deviceId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Emergency Contact:</span>
                    <span className="font-medium">{selectedPatient.contact}</span>
                  </div>
                </div>
              </div>

              {/* Mental Health Status */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-6">
                  <Brain className="h-6 w-6 text-blue-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Mental Health Status</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Status:</span>
                    <span className="font-medium">{selectedPatient.mentalStatus}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Assessment:</span>
                    <span className="font-medium">{selectedPatient.lastAssessment}</span>
                  </div>
                </div>
              </div>

              {/* Menstrual Tracking (Only for female patients) */}
              {selectedPatient.gender === 'Female' && 'menstrualData' in selectedPatient && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center mb-6">
                    <Calendar className="h-6 w-6 text-pink-600 mr-2" />
                    <h2 className="text-xl font-semibold text-gray-900">Menstrual Tracking</h2>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Period:</span>
                      <span className="font-medium">{selectedPatient.menstrualData.lastPeriod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cycle Length:</span>
                      <span className="font-medium">{selectedPatient.menstrualData.cycleLength} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Next Period:</span>
                      <span className="font-medium">{selectedPatient.menstrualData.nextPeriod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Flow:</span>
                      <span className="font-medium">{selectedPatient.menstrualData.flow}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Symptoms:</span>
                      <div className="mt-2">
                        {selectedPatient.menstrualData.symptoms.map((symptom, index) => (
                          <span
                            key={index}
                            className="inline-block bg-pink-100 text-pink-800 text-sm px-3 py-1 rounded-full mr-2 mb-2"
                          >
                            {symptom}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Vital Signs Grid */}
            <div className="lg:col-span-2 space-y-8">
              {/* SPO2 Graph */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <Activity className="h-6 w-6 text-blue-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">SPO2 Levels</h2>
                </div>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={selectedPatient.data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis domain={[90, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="spo2" 
                        stroke="#2563eb" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Saline Level Graph */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <Droplet className="h-6 w-6 text-blue-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Saline Level</h2>
                </div>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={selectedPatient.data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="saline" 
                        stroke="#0891b2" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Heart Rate Graph */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <Heart className="h-6 w-6 text-blue-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Heart Rate</h2>
                </div>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={selectedPatient.data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis domain={[50, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="heartRate" 
                        stroke="#dc2626" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;