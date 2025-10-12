#!/usr/bin/env python3
# Cathedral of Circuits — Terminal Atelier
# Rebecca Respawn (bekalah) · ND-safe · no strobe
# Modes: spiral | octagram | tesseract | lattice | all (default)

import math, shutil, sys, re

CONSTS = [21, 33, 72, 78, 99, 144, 243]
PAL = {
  "violet":"\033[95m","gold":"\033[93m","cyan":"\033[96m","red":"\033[91m",
  "green":"\033[92m","blue":"\033[94m","white":"\033[97m","dim":"\033[2m",
  "reset":"\033[0m","silver":"\033[38;5;250m","teal":"\033[38;5;44m"
}

def strip_ansi(s): return re.sub(r'\x1b\[[0-9;]*m','',s)
def center_line(s):
    cols = shutil.get_terminal_size().columns
    pad = max(0,(cols - len(strip_ansi(s)))//2)
    return " "*pad + s

def header(title, color="gold"):
    print("\n" + center_line(PAL[color] + "⛬ " + title + PAL["reset"]) + "\n")

def spiral_block(steps, size, color="white", mono=False):
    size = max(10, min(40, size)); steps = max(12, min(500, steps))
    grid = [[" " for _ in range(size*2)] for _ in range(size*2)]
    cx, cy = size, size; glyphs = list(".·oO*")
    for i in range(steps):
        ang = i * (math.pi/12.0); radius = i / (steps/size)
        x = int(cx + radius*math.cos(ang)); y = int(cy + radius*math.sin(ang))
        if 0<=x<size*2 and 0<=y<size*2: grid[y][x] = glyphs[i % len(glyphs)]
    col = "" if mono else PAL[color]; reset = "" if mono else PAL["reset"]
    return "\n".join(center_line(col + "".join(row) + reset) for row in grid)

def draw_spirals(mono=False):
    header("Spiral Vaults (Fibonacci grammar)", "violet")
    colors = ["violet","gold","cyan","red","green","blue","white"]
    for i,c in enumerate(CONSTS):
        col = colors[i % len(colors)]
        print(center_line((PAL[col] if not mono else "") + f"— Spiral for {c} —" + (PAL['reset'] if not mono else "")))
        print(spiral_block(steps=c, size=min(33, c//2), color=col, mono=mono)); print()

def octagram_block(r=20, mono=False):
    r = max(10, min(35, r)); w = r*2+1
    canvas = [[" "]*w for _ in range(w)]
    def put(x,y,ch="*"):
        X,Y = r+x, r+y
        if 0<=X<w and 0<=Y<w: canvas[Y][X]=ch
    for k in range(8):
        ang = k*math.pi/4; put(int(round(r*math.cos(ang))), int(round(r*math.sin(ang))), "*")
    for t in [i/400 for i in range(401)]:
        ang = t*2*math.pi; put(int(round(r*math.cos(ang))), int(round(r*math.sin(ang))),"*")
    col = "" if mono else PAL["gold"]; reset = "" if mono else PAL["reset"]
    return "\n".join(center_line(col + "".join(row) + reset) for row in canvas)

def draw_octagram(mono=False):
    header("Octagram — balance wheel", "gold")
    print(octagram_block(r=20, mono=mono)); print()

def tesseract_block(s=12, mono=False):
    s = max(6, min(16, s)); cols = s*4+8; rows = s*3+10
    canvas = [[" "]*cols for _ in range(rows)]
    def put(x,y,ch="*"):
        if 0<=x<cols and 0<=y<rows: canvas[y][x]=ch
    fx, fy = 4, 4
    for i in range(s+1): put(fx+i,fy,"*"); put(fx+i,fy+s,"*"); put(fx,fy+i,"*"); put(fx+s,fy+i,"*")
    bx, by = fx+s+6, fy+3
    for i in range(s+1): put(bx+i,by,"*"); put(bx+i,by+s,"*"); put(bx,by+i,"*"); put(bx+s,by+i,"*")
    for dy in [0,s]:
        for dx in [0,s]:
            x1,y1 = fx+dx,fy+dy; x2,y2 = bx+dx,by+dy
            steps = max(abs(x2-x1),abs(y2-y1))
            for t in range(steps+1):
                x = int(round(x1 + (x2-x1)*t/steps)); y = int(round(y1 + (y2-y1)*t/steps))
                put(x,y,"*")
    col = "" if mono else PAL["cyan"]; reset = "" if mono else PAL["reset"]
    return "\n".join(center_line(col + "".join(row) + reset) for row in canvas)

def draw_tesseract(mono=False):
    header("Tesseract — corridor of simultaneity", "cyan")
    print(tesseract_block(s=12, mono=mono)); print()

def draw_lattice(mono=False):
    header("144 Lattice · 99 Gates", "teal")
    def is_prime(n):
        if n<2: return False
        if n%2==0 and n!=2: return False
        r=int(n**0.5)
        for k in range(3,r+1,2):
            if n%k==0: return False
        return True
    specials=set(CONSTS)
    marks=[i for i in range(1,145) if is_prime(i) or i in specials]
    if len(marks)>99: marks=marks[:99]
    elif len(marks)<99:
        extra=[i for i in range(1,145) if i not in marks]; marks+=extra[:(99-len(marks))]
    gates=set(marks)
    rows=[]
    for r in range(12):
        row=[]
        for c in range(12):
            n=r*12+c+1
            if n in specials and n<=144: cell, col = "◎","gold"
            elif n in gates:             cell, col = "◇","silver"
            else:                        cell, col = "·","dim"
            row.append((cell if mono else PAL[col]+cell+PAL["reset"]))
        rows.append(center_line(" ".join(row)))
    print("\n".join(rows))
    print(center_line((PAL["dim"] if not mono else "")+"legend: ◎ constants  ◇ gates  · lattice"+(PAL["reset"] if not mono else "")))
    print()

def help_text():
    print("Usage: python3 vault.py [mode] [--mono]")
    print("Modes: spiral | octagram | tesseract | lattice | all")
    print("Example: python3 vault.py lattice --mono")

if __name__=="__main__":
    args=sys.argv[1:]; mono=("--mono" in args)
    mode=next((a for a in args if not a.startswith("-")),"all")
    print(center_line(PAL["gold"]+"Cathedral of Circuits — Terminal Atelier"+PAL["reset"]))
    if mode in ("all","spiral"):   draw_spirals(mono)
    if mode in ("all","octagram"): draw_octagram(mono)
    if mode in ("all","tesseract"):draw_tesseract(mono)
    if mode in ("all","lattice"):  draw_lattice(mono)
    if mode not in ("all","spiral","octagram","tesseract","lattice"): help_text()
