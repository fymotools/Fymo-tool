// src/components/Tools/Daily/NotesPad.tsx
import React, { useState, useEffect } from 'react';
import { Notebook, Save, RefreshCcw, Eraser } from 'lucide-react';

const NotesPad: React.FC = () => {
  const [notes, setNotes] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');

  useEffect(() => {
    // Load notes from local storage on component mount
    const savedNotes = localStorage.getItem('fymo-notes-pad');
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  const handleSaveNotes = () => {
    localStorage.setItem('fymo-notes-pad', notes);
    setFeedback('Notes saved successfully!');
    setTimeout(() => setFeedback(''), 2000);
  };

  const handleClearNotes = () => {
    setNotes('');
    localStorage.removeItem('fymo-notes-pad');
    setFeedback('Notes cleared!');
    setTimeout(() => setFeedback(''), 2000);
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold text-textDark mb-4">Online Notes Pad</h2>
      <p className="text-textLight mb-4">
        A simple, client-side notes pad to quickly jot down ideas, reminders, or any text. Your notes are saved in your browser's local storage.
      </p>

      <div>
        <label htmlFor="notes-textarea" className="block text-textDark text-sm font-medium mb-2">
          Your Notes
        </label>
        <textarea
          id="notes-textarea"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Start writing your notes here... (Saved automatically in your browser)"
          rows={12}
          className="w-full p-3 border border-borderLight rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y"
        ></textarea>
      </div>

      <div className="flex space-x-4 justify-end">
        <button
          onClick={handleSaveNotes}
          className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary transition-colors font-semibold flex items-center justify-center"
        >
          <Save size={20} className="mr-2" /> Save Notes
        </button>
        <button
          onClick={handleClearNotes}
          className="px-4 py-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium flex items-center"
        >
          <Eraser size={18} className="mr-2" /> Clear Notes
        </button>
      </div>

      {feedback && <p className={`text-sm ${feedback.includes('saved') || feedback.includes('cleared') ? 'text-green-600' : 'text-red-600'}`}>{feedback}</p>}

      <div className="bg-gray-100 p-3 rounded-md text-sm text-gray-700">
        <p>
          <Notebook size={16} className="inline-block mr-1" /> Notes are saved in your browser's **Local Storage**. They will persist even if you close and reopen the browser, but they are tied to this specific browser on this device. Clearing your browser data will delete these notes.
        </p>
      </div>
    </div>
  );
};

export default NotesPad;
