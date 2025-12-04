"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArcanaeCard = void 0;
var react_1 = require("react");
var ArcanaeCard = function (_a) {
    var arcana = _a.arcana, onSelect = _a.onSelect, _b = _a.selected, selected = _b === void 0 ? false : _b;
    var _c = (0, react_1.useState)(false), isHovered = _c[0], setIsHovered = _c[1];
    return (<div className={"arcanae-card ".concat(selected ? 'selected' : '')} onClick={function () { return onSelect === null || onSelect === void 0 ? void 0 : onSelect(arcana); }} onMouseEnter={function () { return setIsHovered(true); }} onMouseLeave={function () { return setIsHovered(false); }} style={{
            border: selected ? '2px solid #FFD700' : '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            padding: '0',
            margin: '16px',
            background: 'rgba(24, 24, 28, 0.7)',
            color: '#fff',
            cursor: 'pointer',
            minWidth: '200px',
            boxShadow: selected
                ? '0 0 32px rgba(255, 215, 0, 0.3)'
                : '0 0 12px rgba(0, 0, 0, 0.5)',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(6px)'
        }}>
      <div style={{
            height: '180px',
            background: "radial-gradient(ellipse at 50% 0%, ".concat(arcana.science_correspondences.color, " 0%, #18181c 100%)"),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
        }}>
        <div style={{
            fontSize: '4rem',
            opacity: 0.7
        }}>
          🃏
        </div>
        <div style={{
            position: 'absolute',
            top: '8px',
            right: '12px',
            fontSize: '32px',
            opacity: 0.7
        }}>
          {arcana.name.split(' ')[0] === 'The' ? '🃏' : '🎭'}
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        <div style={{
            fontWeight: 'bold',
            fontSize: '22px',
            letterSpacing: '1px',
            marginBottom: '8px'
        }}>
          {arcana.name}
        </div>

        <div style={{
            fontSize: '15px',
            color: arcana.science_correspondences.color,
            marginBottom: '8px'
        }}>
          {arcana.science_correspondences.frequency} Hz • {arcana.science_correspondences.crystal}
        </div>

        <div style={{
            fontSize: '13px',
            color: '#aaa',
            marginTop: '4px'
        }}>
          Guardian: {arcana.guardian_spirit}
        </div>
      </div>

      {isHovered && (<div style={{
                position: 'absolute',
                left: '0',
                top: '0',
                width: '100%',
                height: '100%',
                background: 'rgba(20, 16, 32, 0.98)',
                color: '#fff',
                zIndex: 10,
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '16px',
                borderRadius: '24px',
                boxShadow: '0 0 32px #000'
            }}>
          <div style={{
                fontWeight: 'bold',
                fontSize: '20px',
                marginBottom: '8px'
            }}>
            {arcana.name}
          </div>

          <div style={{
                fontStyle: 'italic',
                marginBottom: '12px',
                textAlign: 'center'
            }}>
            {arcana.core_teaching}
          </div>

          <div style={{
                fontSize: '13px',
                color: '#ffd700',
                marginBottom: '8px'
            }}>
            Tradition: {arcana.tradition_engine}
          </div>

          <div style={{
                fontSize: '13px',
                color: '#aaa'
            }}>
            Lab: {arcana.lab_environment}
          </div>
        </div>)}
    </div>);
};
exports.ArcanaeCard = ArcanaeCard;
