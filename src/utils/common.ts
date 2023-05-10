// 线别
const lineCateOptions = [
  { name: '正线', code: 0 },
  { name: '其他站线', code: 1 },
  { name: '到发线', code: 2 }
]
// 行别
const rowOptions = [
  { name: '单线', code: 0 },
  { name: '上行', code: 1 },
  { name: '下行', code: 2 },
  { name: '三线', code: 3 },
  { name: '四线', code: 4 },
  { name: '三线', code: 5 },
  { name: '五线', code: 6 },
  { name: '六线', code: 7 },
  { name: '专用线', code: 8 }
]
// 股别
const gubieOptions = [
  { name: '左股', code: 0 },
  { name: '右股', code: 1 }
]
// 直曲
const straightCurveOptions = [
  { name: '曲', code: 0 },
  { name: '曲上', code: 1 },
  { name: '直', code: 2 },
  { name: '曲下', code: 3 },
  { name: '曲股', code: 4 },
  { name: '缓曲', code: 5 },
  { name: '缓直', code: 6 }
]
// 钢轨类型
const railTypeOptions = [
  { name: '43kg/m', code: 0 },
  { name: '50kg/m', code: 1 },
  { name: '60kg/m', code: 2 },
  { name: '75kg/m', code: 3 }
]
// 伤损归类
const injuryClassifyOptions = [
  { name: '核伤', code: 'H' },
  { name: '裂纹', code: 'K' },
  { name: '掉块', code: 'Y' },
  { name: '铝热焊缝', code: 'L' },
  { name: '气压焊缝', code: 'Q' },
  { name: '接触焊缝', code: 'J' },
  { name: '其它伤损', code: 'T' }
]
//焊缝位置类型
const locationTypeOptions = [
  { name: '正线焊缝', code: 1 },
  { name: '站线焊缝', code: 2 },
  { name: '道岔焊缝', code: 3 }
]
//轨道类型
const trackTypeOptions = [
  { name: '有缝', code: 1 },
  { name: '无缝', code: 2 }
]
//操作状态
const operateOptions = [
  { name: '运营', code: 1 },
  { name: '其他', code: 2 }
]
//侧量类型
const measureOptions = [
  { name: '准轨', code: 1 },
  { name: '其他', code: 2 }
]
//数据状态
const dataType = [
  { name: '启用', code: 1 },
  { name: '停用', code: 0 }
]
//左右开
const leftRightOptions = [
  { name: '左', code: 1 },
  { name: '右', code: 2 }
]
//线路类型
const lineTypeOptions = [
  { name: '普通', code: 1 },
  { name: '无缝', code: 2 }
]
export {
  lineCateOptions,
  rowOptions,
  gubieOptions,
  straightCurveOptions,
  railTypeOptions,
  injuryClassifyOptions,
  locationTypeOptions,
  trackTypeOptions,
  operateOptions,
  measureOptions,
  dataType,
  leftRightOptions,
  lineTypeOptions
}
