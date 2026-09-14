/** Cute iconfont symbols (project 5232947). Decorative only — not UI chrome. */

export const XFZH_GLYPH = {
  cangshu: 'cangshu',
  chaiquan: 'chaiquan',
  buoumao: 'buoumao',
  cangao: 'cangao',
  bianmu: 'bianmu',
  fadou: 'fadou',
  hashiqi: 'hashiqi',
  kedaya: 'kedaya',
  jumao: 'jumao',
  keji: 'keji',
  tianyuanquan: 'tianyuanquan',
  jinmao: 'jinmao',
  baimao: 'baimao',
  sanhuamao: 'sanhuamao',
  caihongyun: 'caihongyun',
  bangbangtang: 'bangbangtang',
  caihongyunyun: 'caihongyunyun',
  haixing: 'haixing',
  hamigua: 'hamigua',
  guocha: 'guocha',
  kafei: 'kafei',
  kafei2: 'a-kafei2',
  lamian: 'lamian',
  liuxing: 'liuxing',
  xigua: 'xigua',
  keainiujiaobao: 'keainiujiaobao',
  makalong: 'makalong',
  naicha: 'naicha',
  xingxing: 'xingxing',
  mianbao: 'mianbao',
  pingguo: 'pingguo',
  konglong: 'konglong',
  shousi: 'shousi',
  tiantianquan: 'tiantianquan',
  pisa: 'pisa',
  bingqiling: 'bingqiling',
  apiao: 'apiao',
  caomeijuan: 'caomeijuan',
  dangaojuan: 'dangaojuan',
  hudie: 'hudie',
  hun: 'hun',
  jingyu: 'jingyu',
  gougou: 'gougou',
  huangguan: 'huangguan',
  fantuan: 'fantuan',
  hudiejie: 'hudiejie',
  xingxing2: 'a-xingxing2',
  xiongmaotou: 'xiongmaotou',
  juanmaogougou: 'juanmaogougou',
  tutu: 'tutu',
  xingxing1: 'xingxing1',
} as const

export const XFZH_CLICK_GLYPHS: readonly string[] = Object.values(XFZH_GLYPH)

export const XFZH_SPRINKLE: readonly {
  readonly glyph: string
  readonly left: string
  readonly top: string
  readonly size: string
  readonly rotate: string
}[] = [
  { glyph: XFZH_GLYPH.caihongyun, left: '5%', top: '7%', size: '40px', rotate: '-10deg' },
  { glyph: XFZH_GLYPH.hudiejie, left: '23%', top: '4%', size: '24px', rotate: '14deg' },
  { glyph: XFZH_GLYPH.liuxing, left: '62%', top: '5%', size: '26px', rotate: '24deg' },
  { glyph: XFZH_GLYPH.xingxing1, left: '78%', top: '4%', size: '24px', rotate: '18deg' },
  { glyph: XFZH_GLYPH.hudie, left: '91%', top: '13%', size: '30px', rotate: '8deg' },
  { glyph: XFZH_GLYPH.kafei, left: '4%', top: '32%', size: '30px', rotate: '-8deg' },
  { glyph: XFZH_GLYPH.xiongmaotou, left: '6%', top: '48%', size: '32px', rotate: '-16deg' },
  { glyph: XFZH_GLYPH.jumao, left: '91%', top: '34%', size: '36px', rotate: '10deg' },
  { glyph: XFZH_GLYPH.keainiujiaobao, left: '5%', top: '64%', size: '30px', rotate: '6deg' },
  { glyph: XFZH_GLYPH.naicha, left: '88%', top: '56%', size: '28px', rotate: '-8deg' },
  { glyph: XFZH_GLYPH.kedaya, left: '6%', top: '82%', size: '28px', rotate: '12deg' },
  { glyph: XFZH_GLYPH.makalong, left: '28%', top: '89%', size: '26px', rotate: '10deg' },
  { glyph: XFZH_GLYPH.jingyu, left: '52%', top: '90%', size: '32px', rotate: '-6deg' },
]
