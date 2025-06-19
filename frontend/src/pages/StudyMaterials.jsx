import React from 'react';
import { BookOpen, Video, FileText, Headphones, Star, Download } from 'lucide-react';

const StudyMaterials = () => {
  const materials = [
    {
      id: 1,
      title: "Basic Conversation Patterns",
      type: "PDF",
      level: "Beginner",
      language: "English",
      downloads: 245,
      rating: 4.5,
      icon: <FileText className="size-5" />,
    },
    {
      id: 2,
      title: "Pronunciation Guide",
      type: "Video",
      level: "Intermediate",
      language: "English",
      downloads: 189,
      rating: 4.8,
      icon: <Video className="size-5" />,
    },
    // ...more materials
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Study Materials</h1>
          <p className="text-base-content/70">
            Access our curated collection of learning resources to enhance your language skills
          </p>
        </div>

        {/* Categories Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <button className="btn btn-outline gap-2">
            <BookOpen className="size-5" />
            Reading
          </button>
          <button className="btn btn-outline gap-2">
            <Headphones className="size-5" />
            Listening
          </button>
          <button className="btn btn-outline gap-2">
            <FileText className="size-5" />
            Writing
          </button>
          <button className="btn btn-outline gap-2">
            <Video className="size-5" />
            Speaking
          </button>
        </div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((material) => (
            <div key={material.id} className="card bg-base-200 hover:shadow-lg transition-shadow">
              <div className="card-body">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {material.icon}
                    <h3 className="card-title">{material.title}</h3>
                  </div>
                  <div className="badge badge-primary">{material.type}</div>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="opacity-70">Level:</span>
                    <span className="font-medium">{material.level}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="opacity-70">Language:</span>
                    <span className="font-medium">{material.language}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="size-4 text-yellow-400" />
                      <span>{material.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="size-4" />
                      <span>{material.downloads}</span>
                    </div>
                  </div>
                </div>

                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-primary btn-sm">
                    Download
                  </button>
                  <button className="btn btn-ghost btn-sm">
                    Preview
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters Section */}
        <div className="flex flex-wrap gap-4 items-center justify-between bg-base-200 p-4 rounded-lg">
          <div className="flex flex-wrap gap-4">
            <select className="select select-bordered w-full max-w-xs">
              <option disabled selected>Level</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
            
            <select className="select select-bordered w-full max-w-xs">
              <option disabled selected>Language</option>
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>

            <select className="select select-bordered w-full max-w-xs">
              <option disabled selected>Type</option>
              <option>PDF</option>
              <option>Video</option>
              <option>Audio</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button className="btn btn-primary">
              Apply Filters
            </button>
            <button className="btn btn-ghost">
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyMaterials;