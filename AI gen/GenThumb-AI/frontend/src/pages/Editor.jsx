import { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Image as KonvaImage, Text, Transformer } from 'react-konva';
import useImage from 'use-image';
import { Icon } from '@iconify/react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../services/api';
import { useToast } from '../context/ToastContext';

const Editor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToast } = useToast();
  const queryParams = new URLSearchParams(location.search);
  const thumbnailId = queryParams.get('id');

  const [thumbnailData, setThumbnailData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bgImage] = useImage(thumbnailData?.imageUrl, 'anonymous');
  
  const stageRef = useRef(null);
  const trRef = useRef(null);

  useEffect(() => {
    const fetchThumbnail = async () => {
      if (!thumbnailId) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await api.get('/thumbnail/history');
        const found = data.find(t => t._id === thumbnailId);
        if (found) {
          setThumbnailData(found);
        } else {
          addToast("Thumbnail not found.", "error");
          navigate('/dashboard');
        }
      } catch (err) {
        addToast("Error loading editor.", "error");
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchThumbnail();
  }, [thumbnailId, navigate, addToast]);

  const [texts, setTexts] = useState([
    { id: '1', text: 'EPIC TEXT', x: 100, y: 100, fontSize: 60, fill: '#FFFFFF', isDragging: false }
  ]);
  
  const [selectedId, selectShape] = useState(null);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-dark-900">
        <Icon icon="line-md:loading-loop" className="text-5xl text-brand-500" />
      </div>
    );
  }

  // Deselect when clicking on empty background
  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    const clickedOnBg = e.target.attrs.id === 'bg-image';
    if (clickedOnEmpty || clickedOnBg) {
      selectShape(null);
    }
  };

  useEffect(() => {
    if (selectedId && trRef.current) {
      const selectedNode = stageRef.current.findOne(`#${selectedId}`);
      if (selectedNode) {
        trRef.current.nodes([selectedNode]);
        trRef.current.getLayer().batchDraw();
      }
    }
  }, [selectedId]);

  const addText = () => {
    const newText = {
      id: `text-${Date.now()}`,
      text: 'NEW TEXT',
      x: 50,
      y: 50,
      fontSize: 50,
      fill: '#FFFFFF',
      isDragging: false,
    };
    setTexts([...texts, newText]);
    selectShape(newText.id);
  };

  const handleDragStart = (e) => {
    const id = e.target.id();
    setTexts(
      texts.map((t) => (t.id === id ? { ...t, isDragging: true } : t))
    );
  };

  const handleDragEnd = (e) => {
    const id = e.target.id();
    setTexts(
      texts.map((t) => (t.id === id ? { ...t, isDragging: false, x: e.target.x(), y: e.target.y() } : t))
    );
  };

  const updateSelectedText = (property, value) => {
    setTexts(
      texts.map((t) => (t.id === selectedId ? { ...t, [property]: value } : t))
    );
  };

  const downloadURI = (uri, name) => {
    const link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExport = () => {
    // Clear selection so bounding box doesn't appear in export
    selectShape(null);
    setTimeout(() => {
      const uri = stageRef.current.toDataURL({ pixelRatio: 1, mimeType: 'image/jpeg', quality: 1 });
      downloadURI(uri, 'GenThumb-Final.jpg');
    }, 100);
  };

  const getSelectedTextItem = () => texts.find((t) => t.id === selectedId);

  return (
    <div className="min-h-screen flex flex-col bg-dark-900 text-white">
      {/* Editor Topbar */}
      <div className="h-16 bg-dark-800 border-b border-gray-700 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="text-gray-400 hover:text-white transition">
            <Icon icon="mdi:arrow-left" className="text-2xl" />
          </button>
          <h1 className="font-bold text-lg">Thumbnail Editor</h1>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleExport}
            className="bg-brand-600 hover:bg-brand-500 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 shadow-lg shadow-brand-500/20 transition"
          >
            <Icon icon="mdi:download" /> Export 1080p
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Toolbar */}
        <div className="w-64 bg-dark-800 border-r border-gray-700 p-4 shrink-0 overflow-y-auto">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Add Elements</h2>
          
          <button 
            onClick={addText}
            className="w-full bg-dark-900 border border-gray-700 hover:border-brand-500 rounded-xl p-4 flex flex-col items-center gap-2 transition group"
          >
            <Icon icon="mdi:format-text" className="text-3xl text-gray-400 group-hover:text-brand-500 transition" />
            <span className="font-medium text-sm">Add Heading</span>
          </button>

          {selectedId && getSelectedTextItem() && (
            <div className="mt-8 space-y-4">
              <h2 className="text-xs font-bold text-brand-500 uppercase tracking-wider">Edit Selection</h2>
              
              <div>
                <label className="block text-xs text-gray-400 mb-1">Text Value</label>
                <input 
                  type="text" 
                  value={getSelectedTextItem().text}
                  onChange={(e) => updateSelectedText('text', e.target.value)}
                  className="w-full bg-dark-900 border border-gray-700 rounded p-2 text-sm focus:border-brand-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Color</label>
                <input 
                  type="color" 
                  value={getSelectedTextItem().fill}
                  onChange={(e) => updateSelectedText('fill', e.target.value)}
                  className="w-full h-10 rounded border-none bg-dark-900 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Font Size</label>
                <input 
                  type="range" 
                  min="20" max="200"
                  value={getSelectedTextItem().fontSize}
                  onChange={(e) => updateSelectedText('fontSize', parseInt(e.target.value, 10))}
                  className="w-full accent-brand-500"
                />
              </div>

              <button 
                onClick={() => {
                  setTexts(texts.filter((t) => t.id !== selectedId));
                  selectShape(null);
                }}
                className="w-full mt-4 py-2 border border-red-500/30 text-red-500 hover:bg-red-500/10 rounded flex items-center justify-center gap-1 transition text-sm font-bold"
              >
                <Icon icon="mdi:delete" /> Remove Layer
              </button>
            </div>
          )}
        </div>

        {/* Canvas Area */}
        <div className="flex-1 bg-black overflow-auto flex items-center justify-center p-8 relative">
          
          {/* Responsive aspect-ratio container for the stage */}
          <div className="shadow-2xl ring-1 ring-gray-700 rounded-lg overflow-hidden" style={{ width: 800, height: 450 }}>
            <Stage 
              width={800} 
              height={450} 
              onMouseDown={checkDeselect}
              onTouchStart={checkDeselect}
              ref={stageRef}
            >
              <Layer>
                {/* Background AI Image */}
                {bgImage && (
                  <KonvaImage 
                    image={bgImage} 
                    id="bg-image"
                    width={800} 
                    height={450} 
                  />
                )}

                {/* Text Layers */}
                {texts.map((text) => (
                  <Text
                    key={text.id}
                    id={text.id}
                    text={text.text}
                    x={text.x}
                    y={text.y}
                    fontSize={text.fontSize}
                    fill={text.fill}
                    draggable
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onClick={() => selectShape(text.id)}
                    onTap={() => selectShape(text.id)}
                    fontFamily="Inter, sans-serif"
                    fontStyle="900" // Extra black font for thumbnails
                    shadowColor="black"
                    shadowBlur={10}
                    shadowOffset={{ x: 3, y: 3 }}
                    shadowOpacity={0.8}
                  />
                ))}

                {/* Transformer (Selection Box) */}
                {selectedId && (
                  <Transformer 
                    ref={trRef}
                    boundBoxFunc={(oldBox, newBox) => {
                      // limit resize
                      if (newBox.width < 5 || newBox.height < 5) return oldBox;
                      return newBox;
                    }}
                  />
                )}
              </Layer>
            </Stage>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Editor;
