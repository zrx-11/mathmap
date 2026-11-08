
"use strict";
/* ================= 数据 =================
   id: 唯一标识 | n: 名称 | c: 大类 | s: 子类 | l: 阶段0-6
   b: 路径(core公共 / ai / finance) | p: 前置id数组
   d: 一句话 | g: 学什么·掌握程度 | a: 应用
   ===================================== */
const CATS = [
  {c:"算术与数感", color:"#FF5B5B"},
  {c:"初等代数与方程", color:"#FF9E3D"},
  {c:"几何与三角", color:"#F7C948"},
  {c:"函数与数列", color:"#A8D640"},
  {c:"数学分析", color:"#34D399"},
  {c:"线性代数", color:"#2DD4BF"},
  {c:"抽象代数与数论", color:"#38BDF8"},
  {c:"实变复变与泛函", color:"#60A5FA"},
  {c:"几何与拓扑", color:"#818CF8"},
  {c:"概率统计与随机", color:"#C084FC"},
  {c:"离散数学与计算", color:"#E879F9"},
  {c:"最优化与运筹", color:"#FB7185"},
  {c:"应用数学", color:"#22D3EE"},
  {c:"AI 大模型方向", color:"#F472B6"},
  {c:"金融量化方向", color:"#FBBF24"}
];
const CAT_MAP = {};
CATS.forEach(k=>CAT_MAP[k.c]=k);

const NODES = [
{id:"num-natural",n:"自然数与四则运算",c:"算术与数感",s:"数与运算",l:0,b:"core",p:[],d:"自然数计数、加减乘除与运算律，全部数学的第一块地基。",g:"整数四则混合运算熟练，掌握交换/结合/分配律；口算与竖式准确、快速。",a:"日常计算；程序语言中整数运算与溢出概念的最初直觉。"},
{id:"fraction-decimal",n:"分数与小数",c:"算术与数感",s:"数与运算",l:0,b:"core",p:["num-natural"],d:"分数意义、通分约分与小数互化，进入「量可以细分」的世界。",g:"完成分数四则运算，理解小数与分数互化、循环小数的由来。",a:"比例调配；浮点数精度问题（0.1+0.2≠0.3）的最初体验。"},
{id:"ratio-percent",n:"百分数与比例",c:"算术与数感",s:"数与运算",l:0,b:"core",p:["fraction-decimal"],d:"百分率、比例与比值，用相对关系刻画数量。",g:"熟练解比例问题，区分「比」「比例」「百分率」三种语言。",a:"折扣、税率；利率与收益率的起点（金融常识入口）。"},
{id:"neg-number",n:"负数与数轴",c:"算术与数感",s:"数与运算",l:0,b:"core",p:["num-natural"],d:"负数概念、数轴、相反数与绝对值，数从点变成直线。",g:"掌握负数四则运算，理解绝对值是到原点的距离。",a:"温度/盈亏表示；误差与偏移量的基本直觉。"},
{id:"power-root",n:"幂与根式",c:"算术与数感",s:"数与运算",l:0,b:"core",p:["num-natural"],d:"平方立方、指数记法与根式，处理「增长的阶」。",g:"掌握整数指数幂运算与平方根化简，会用科学计数法。",a:"单位换算与数量级估算；模型规模（10^9 参数量级）的直觉。"},
{id:"geometry-intro",n:"几何图形认知",c:"算术与数感",s:"数与运算",l:0,b:"core",p:["num-natural"],d:"点线面角、周长面积与基本立体，空间直觉的起点。",g:"会算常见平面图形的周长面积与简单立体体积。",a:"构图与测量的直觉；像素网格与图像尺寸概念。"},
{id:"algebra-basic",n:"代数式与整式",c:"初等代数与方程",s:"代数入门",l:1,b:"core",p:["num-natural","fraction-decimal"],d:"用字母表示数、单项式多项式与合并同类项，从算术走向代数。",g:"熟练整式加减乘运算、代入求值与去括号。",a:"程序变量与表达式求值的原型；公式化的开始。"},
{id:"linear-eq",n:"一元一次方程",c:"初等代数与方程",s:"方程",l:1,b:"core",p:["algebra-basic"],d:"等式性质、移项与解一元一次方程，第一次「求未知量」。",g:"掌握去分母去括号解法，能用方程建模简单问题。",a:"盈亏平衡点计算；成本收益的代数表达。"},
{id:"linear-system",n:"二元一次方程组",c:"初等代数与方程",s:"方程",l:1,b:"core",p:["linear-eq"],d:"代入消元与加减消元，处理多个约束同时成立。",g:"熟练解二元一次方程组，理解解的几何意义（两线交点）。",a:"联立供求关系；线性方程组的第一次相遇。"},
{id:"quadratic-eq",n:"一元二次方程",c:"初等代数与方程",s:"方程",l:1,b:"core",p:["linear-eq"],d:"配方法、求根公式与判别式，根的形态由 Δ 决定。",g:"掌握配方法/公式法/因式分解三种解法，会用韦达定理。",a:"抛物线运动；产量最优化的初等版本。"},
{id:"inequality",n:"不等式与不等式组",c:"初等代数与方程",s:"不等式",l:1,b:"core",p:["linear-eq"],d:"不等式性质、解不等式与区间表示，约束的代数语言。",g:"会解一元一次/二次不等式，用数轴表示解集。",a:"可行域与约束条件的最初直觉（优化问题雏形）。"},
{id:"factorization",n:"因式分解",c:"初等代数与方程",s:"代数入门",l:1,b:"core",p:["algebra-basic","quadratic-eq"],d:"提取公因式、公式法与十字相乘，把表达式拆成乘积。",g:"熟练分解二次三项式与常见公式型。",a:"化简与求根加速；多项式算法的地基。"},
{id:"rational-expression",n:"分式与有理式",c:"初等代数与方程",s:"代数入门",l:1,b:"core",p:["factorization","fraction-decimal"],d:"分式运算、约分通分与最简形式，比值关系的代数化。",g:"掌握分式四则运算与化简。",a:"比率模型；概率比值计算的基础。"},
{id:"plane-geometry",n:"平面几何基础",c:"几何与三角",s:"平面几何",l:1,b:"core",p:["geometry-intro"],d:"平行线、三角形与四边形性质，第一次严格推理由此开始。",g:"掌握常见图形性质，能完成简单几何证明。",a:"证明训练的起点；逻辑严密性的源头。"},
{id:"congruent-similar",n:"全等与相似",c:"几何与三角",s:"平面几何",l:1,b:"core",p:["plane-geometry"],d:"全等判定与相似比，形状不变与等比例缩放。",g:"会用判定定理证明，会利用相似求长度。",a:"三角测距；图像缩放（相似变换）的直觉。"},
{id:"circle-geo",n:"圆与圆幂定理",c:"几何与三角",s:"平面几何",l:1,b:"core",p:["congruent-similar"],d:"圆心角圆周角、切线与相交弦定理，圆的对称性。",g:"掌握圆的性质定理与相关计算。",a:"圆弧轨迹；旋转对称与周期性的几何入口。"},
{id:"number-line-coord",n:"平面直角坐标系",c:"几何与三角",s:"解析几何",l:1,b:"core",p:["neg-number"],d:"坐标表示、距离与中点公式，几何开始可计算。",g:"熟练坐标点与图形的一一对应。",a:"像素坐标系；数据可视化坐标轴的原理。"},
{id:"linear-func",n:"一次函数与图像",c:"几何与三角",s:"解析几何",l:1,b:"core",p:["number-line-coord","algebra-basic"],d:"斜率、截距与直线方程，量与量之间的线性关系。",g:"掌握斜率意义，会从图像读线性关系。",a:"线性回归的直观先导；直线拟合。"},
{id:"quadratic-func",n:"二次函数",c:"函数与数列",s:"初等函数",l:2,b:"core",p:["quadratic-eq","linear-func"],d:"顶点式、对称轴与图像，抛物线的完整形态。",g:"熟练二次函数的性质、最值与图像变换。",a:"抛物线模型；凸函数（碗形）直觉——损失函数的雏形。"},
{id:"trig-basic",n:"三角函数初步",c:"几何与三角",s:"三角学",l:2,b:"core",p:["congruent-similar","circle-geo"],d:"正弦余弦正切的定义与单位圆，角度与比值的对应。",g:"掌握三角函数定义、特殊角值与单位圆表示。",a:"周期信号；图像旋转与傅里叶的源头。"},
{id:"trig-identity",n:"三角恒等变换",c:"几何与三角",s:"三角学",l:2,b:"core",p:["trig-basic"],d:"和差角、倍角半角与辅助角公式，三角运算的化简工具。",g:"会推导并灵活运用主要恒等式。",a:"信号相位分析；傅里叶级数的直接前置。"},
{id:"solve-triangle",n:"解三角形",c:"几何与三角",s:"三角学",l:2,b:"core",p:["trig-identity"],d:"正弦定理、余弦定理与面积公式，边角互求。",g:"会用定理求边角与三角形面积。",a:"导航测距；GPS 三角定位原理。"},
{id:"vector-basic",n:"平面向量",c:"几何与三角",s:"向量初步",l:2,b:"core",p:["number-line-coord","trig-basic"],d:"向量加减、数乘与数量积，带方向的量。",g:"掌握向量运算、共线垂直判定与坐标化。",a:"位移与力的合成；词嵌入（向量表示）的直觉先导。"},
{id:"analytic-geo",n:"解析几何",c:"几何与三角",s:"解析几何",l:2,b:"core",p:["vector-basic","linear-func","circle-geo"],d:"圆锥曲线（椭圆/双曲线/抛物线）方程与性质。",g:"掌握圆锥曲线方程、几何性质与直线位置关系。",a:"轨道计算；协方差椭圆与二次曲面直觉。"},
{id:"set-map",n:"集合与映射",c:"函数与数列",s:"集合与逻辑",l:2,b:"core",p:["algebra-basic"],d:"集合运算、关系与映射，现代数学的通用语言。",g:"理解集合运算、子集与映射（函数）的严格定义。",a:"数据结构的集合观；SQL 集合操作。"},
{id:"func-concept",n:"函数概念与性质",c:"函数与数列",s:"初等函数",l:2,b:"core",p:["set-map","linear-func"],d:"定义域值域、单调性奇偶性周期性，函数的完整刻画。",g:"会按定义证明单调性等性质，分析函数形态。",a:"程序函数与状态；时间序列的直觉。"},
{id:"exponent-log",n:"指数与对数函数",c:"函数与数列",s:"初等函数",l:2,b:"core",p:["power-root","func-concept"],d:"指数函数、对数函数与换底公式，增长与压缩的镜像。",g:"掌握图像性质、对数运算与常用换底。",a:"复利与衰减模型；信息熵的数学基础。"},
{id:"func-analysis",n:"函数综合与图像变换",c:"函数与数列",s:"初等函数",l:2,b:"core",p:["quadratic-func","exponent-log"],d:"图像平移伸缩对称与反函数，函数变换的全局视角。",g:"能分析复合函数与图像变换后的性质。",a:"数据曲线拟合与预处理的前置。"},
{id:"sequence",n:"数列与等差等比",c:"函数与数列",s:"数列",l:2,b:"core",p:["func-concept"],d:"通项公式、求和与等差等比数列，离散的规律。",g:"掌握数列基本量、求和公式与递推。",a:"分期付款计算；算法复杂度 O(n)/O(n²) 的直觉。"},
{id:"induction",n:"数学归纳法",c:"函数与数列",s:"数列",l:2,b:"core",p:["sequence"],d:"归纳原理与递推证明，处理无限命题的有限工具。",g:"能独立完成归纳证明，理解归纳与递推的关系。",a:"算法正确性证明；递归程序的数学根基。"},
{id:"permute-combine",n:"排列组合与二项式",c:"函数与数列",s:"组合初步",l:2,b:"core",p:["set-map","sequence"],d:"计数原理、排列组合与二项式定理，数「多少种可能」。",g:"熟练排列/组合/分组等经典计数模型。",a:"组合爆炸直觉；神经网络参数组合的规模感。"},
{id:"prob-basic",n:"概率初步",c:"概率统计与随机",s:"概率入门",l:2,b:"core",p:["permute-combine"],d:"古典概型、几何概型与频率概率，随机性的首次数学化。",g:"会用古典概型计算概率，理解频率逼近概率。",a:"抽样直觉；「随机」概念的第一次严格接触。"},
{id:"stat-basic",n:"统计初步",c:"概率统计与随机",s:"统计入门",l:2,b:"core",p:["prob-basic"],d:"平均数中位数众数、方差与频数分布，描述数据。",g:"能计算基本统计量并读懂统计图表。",a:"数据描述；课程成绩与测评分析。"},
{id:"limit-basic",n:"极限初步",c:"数学分析",s:"极限论",l:3,b:"core",p:["exponent-log","rational-expression"],d:"数列极限与函数极限的直观理解，微积分的入口。",g:"会用定义验证简单极限，理解夹逼准则的直观。",a:"数值逼近；算法收敛概念的最初体会。"},
{id:"limit-epsilon",n:"ε-δ语言与极限理论",c:"数学分析",s:"极限论",l:3,b:"core",p:["limit-basic"],d:"极限的严格化：ε-δ 定义、极限运算与两个重要极限。",g:"能严格证明极限性质，掌握 ε-δ 论证范式。",a:"数值稳定性分析；收敛性证明的严格基础。"},
{id:"continuity",n:"连续函数与介值定理",c:"数学分析",s:"极限论",l:3,b:"core",p:["limit-epsilon"],d:"连续性的严格定义与介值定理，图像不断裂的数学表述。",g:"会用介值定理证明方程有根，理解一致连续。",a:"二分查找的理论基础；求根算法。"},
{id:"derivative-basic",n:"导数与微分",c:"数学分析",s:"微分学",l:3,b:"core",p:["continuity","quadratic-func"],d:"导数定义、求导法则与微分，变化率的精确刻画。",g:"熟练各类函数求导，理解导数与切线/线性近似。",a:"梯度下降的数学原型；瞬时变化率。"},
{id:"mean-value",n:"微分中值定理",c:"数学分析",s:"微分学",l:3,b:"core",p:["derivative-basic"],d:"罗尔、拉格朗日与柯西中值定理，连接导数与函数本身。",g:"会证明并应用三个中值定理。",a:"误差估计；优化收敛性证明的地基。"},
{id:"lhopital",n:"洛必达法则",c:"数学分析",s:"微分学",l:3,b:"core",p:["mean-value"],d:"用导数处理未定式极限的法则。",g:"会正确判断并运用洛必达法则求极限。",a:"极限计算加速；比值型问题的统一处理。"},
{id:"taylor",n:"泰勒公式",c:"数学分析",s:"微分学",l:3,b:"core",p:["mean-value","series-basic"],d:"泰勒展开与余项，用多项式逼近任意光滑函数。",g:"掌握常见展开式与余项估计。",a:"局部线性化；神经网络中函数近似的理论来源。"},
{id:"func-extreme",n:"函数极值与最值",c:"数学分析",s:"微分学",l:3,b:"core",p:["derivative-basic"],d:"单调性判定、极值与凹凸性，用导数读函数形态。",g:"会用导数分析函数形态并求极值最值。",a:"单变量优化；学习率取舍的直觉。"},
{id:"integral-basic",n:"不定积分",c:"数学分析",s:"积分学",l:3,b:"core",p:["derivative-basic"],d:"原函数、换元法与分部积分，微分的逆运算。",g:"熟练基本积分技巧（换元/分部/有理函数）。",a:"累积量计算；概率密度到分布函数。"},
{id:"definite-integral",n:"定积分与微积分基本定理",c:"数学分析",s:"积分学",l:3,b:"core",p:["integral-basic"],d:"定积分定义与牛顿-莱布尼茨公式，微分与积分统一。",g:"掌握定积分计算、几何与物理应用。",a:"期望 E[X] 的定义；连续累加与面积。"},
{id:"improper-integral",n:"反常积分",c:"数学分析",s:"积分学",l:3,b:"core",p:["definite-integral"],d:"无穷区间与无界函数的积分，收敛性的另一种考验。",g:"会判断收敛性并计算典型反常积分。",a:"概率分布的归一化常数；衰减模型的积分。"},
{id:"series-basic",n:"数项级数",c:"数学分析",s:"级数论",l:3,b:"core",p:["sequence","definite-integral"],d:"级数收敛判别：比较、比值、交错判别法。",g:"掌握主要判别法，能判断收敛与和。",a:"迭代算法的收敛性；期望的无穷级数表达。"},
{id:"power-series",n:"幂级数",c:"数学分析",s:"级数论",l:3,b:"core",p:["series-basic","taylor"],d:"幂级数与收敛半径，函数展开成无穷多项式。",g:"掌握展开运算与收敛区间。",a:"函数逼近；生成函数（组合）与特征函数（概率）的基础。"},
{id:"linear-algebra",n:"线性方程组与矩阵",c:"线性代数",s:"矩阵理论",l:3,b:"core",p:["linear-system","vector-basic"],d:"高斯消元、矩阵运算与逆矩阵，线性世界的核心算法。",g:"会用消元法解方程组，熟练矩阵乘法与求逆。",a:"线性回归正规方程；图像仿射变换。"},
{id:"determinant",n:"行列式",c:"线性代数",s:"矩阵理论",l:3,b:"core",p:["linear-algebra"],d:"行列式定义、性质与克拉默法则，体积与可逆性。",g:"会计算低阶行列式并理解几何意义。",a:"面积体积的线性变化；可逆性判据。"},
{id:"matrix-rank",n:"矩阵的秩与线性相关",c:"线性代数",s:"矩阵理论",l:3,b:"core",p:["determinant","linear-algebra"],d:"秩、线性相关性与秩-零度定理，信息量的代数测度。",g:"掌握秩的计算与意义。",a:"数据降维前提；欠定/超定系统的诊断。"},
{id:"vector-space",n:"向量空间",c:"线性代数",s:"空间理论",l:3,b:"core",p:["matrix-rank"],d:"子空间、基、维数与坐标，线性对象的结构化。",g:"理解空间的代数结构，掌握基变换。",a:"特征空间；表示学习的数学直觉。"},
{id:"linear-map",n:"线性变换",c:"线性代数",s:"空间理论",l:3,b:"core",p:["vector-space"],d:"线性映射、矩阵表示与核/像，变换的代数语言。",g:"掌握变换与矩阵的对应关系。",a:"神经网络的一层=线性变换+激活函数的抽象。"},
{id:"eigen",n:"特征值与特征向量",c:"线性代数",s:"空间理论",l:3,b:"core",p:["linear-map"],d:"特征方程、对角化与谱，不变方向与缩放因子。",g:"会求特征值与特征向量并应用对角化。",a:"PCA 主成分；振动模态；PageRank。"},
{id:"quadratic-form",n:"二次型与正定",c:"线性代数",s:"空间理论",l:4,b:"core",p:["eigen"],d:"二次型标准化与正定性判据，形状的分类。",g:"会用特征值/顺序主子式判断正定性。",a:"损失函数凸性；协方差矩阵的正定性。"},
{id:"inner-product",n:"内积空间与正交",c:"线性代数",s:"空间理论",l:4,b:"core",p:["vector-space"],d:"内积、正交基与施密特正交化，度量与垂直。",g:"掌握正交化过程与投影公式。",a:"最小二乘投影；向量相似度（cosine）的根基。"},
{id:"svd",n:"奇异值分解",c:"线性代数",s:"空间理论",l:4,b:"core",p:["eigen","inner-product"],d:"SVD 定理与截断近似，任意矩阵的分解与压缩。",g:"理解几何意义，会计算小规模 SVD。",a:"推荐系统矩阵分解；图像压缩；大模型权重低秩分解。"},
{id:"number-theory-basic",n:"初等数论",c:"抽象代数与数论",s:"数论",l:4,b:"core",p:["power-root","algebra-basic"],d:"整除、素数、欧几里得算法与同余，整数的深层结构。",g:"掌握 gcd、同余方程与算数基本定理。",a:"公钥密码；哈希与校验和；竞赛数论。"},
{id:"modular-crypto",n:"同余与RSA",c:"抽象代数与数论",s:"数论",l:4,b:"core",p:["number-theory-basic"],d:"欧拉定理、模逆元与 RSA 原理，数论走向应用。",g:"能完成小规模 RSA 加解密推演，理解其安全性依赖。",a:"HTTPS、数字签名；现代网络安全的数学骨架。"},
{id:"group-theory",n:"群论",c:"抽象代数与数论",s:"抽象代数",l:5,b:"core",p:["modular-crypto","set-map"],d:"群公理、子群、陪集与拉格朗日定理，对称性的代数。",g:"掌握群基本定理与循环群分类。",a:"对称性分析；晶体学；纠错码；密码学结构。"},
{id:"ring-field",n:"环与域",c:"抽象代数与数论",s:"抽象代数",l:5,b:"core",p:["group-theory"],d:"环、整环、域与多项式环，加乘结构的公理化。",g:"理解理想、商环与域扩张的基本概念。",a:"编码理论（有限域）；数论深化的语言。"},
{id:"galois",n:"伽罗瓦理论初步",c:"抽象代数与数论",s:"抽象代数",l:5,b:"core",p:["ring-field"],d:"扩域与多项式可解性，高次方程为何无求根公式。",g:"概览伽罗瓦对应思想与五次方程不可解证明路径。",a:"方程理论的巅峰；密码学结构安全性的深层依据。"},
{id:"analytic-number-theory",n:"解析数论与ζ函数",c:"抽象代数与数论",s:"数论",l:6,b:"core",p:["complex-analysis","number-theory-basic"],d:"素数定理与黎曼 ζ 函数，分析学进入数论。",g:"理解 ζ 函数与素数分布的联系（概览级）。",a:"加密安全性论证；当代纯数学前沿的支柱之一。"},
{id:"real-analysis",n:"实分析与测度论",c:"实变复变与泛函",s:"实分析",l:4,b:"core",p:["improper-integral","series-basic"],d:"测度、可测函数与勒贝格积分，积分的彻底重建。",g:"掌握测度构造与勒贝格积分思想（收敛定理）。",a:"概率论的严格基础（概率=测度）；积分的现代语言。"},
{id:"lp-space",n:"Lp空间与收敛",c:"实变复变与泛函",s:"实分析",l:5,b:"core",p:["real-analysis"],d:"Lp 范数、完备性与稠密性，函数成为向量空间的点。",g:"理解函数空间是无穷维向量空间。",a:"L1/L2 正则化惩罚的严格背景。"},
{id:"complex-analysis",n:"复变函数",c:"实变复变与泛函",s:"复分析",l:4,b:"core",p:["taylor","power-series"],d:"解析函数、柯西积分定理与级数，复平面的微积分。",g:"掌握解析函数核心性质与泰勒/洛朗展开。",a:"信号处理（拉普拉斯/傅里叶的复形式）；流体势流。"},
{id:"residue",n:"留数定理",c:"实变复变与泛函",s:"复分析",l:4,b:"core",p:["complex-analysis"],d:"孤立奇点与留数，用复积分算实积分。",g:"会用留数定理计算典型实积分。",a:"困难积分计算；逆 z 变换。"},
{id:"conformal-mapping",n:"共形映射",c:"实变复变与泛函",s:"复分析",l:5,b:"core",p:["complex-analysis"],d:"保角映射与单位圆盘，复杂区域的简化。",g:"概览共形映射思想与黎曼映射定理。",a:"流体力学；势理论；计算网格生成。"},
{id:"banach-space",n:"巴拿赫空间与算子",c:"实变复变与泛函",s:"泛函分析",l:5,b:"core",p:["lp-space"],d:"赋范空间、有界线性算子与三大原理，无穷维的线性代数。",g:"掌握开映射/闭图像/一致有界原理的思想。",a:"数值分析的收敛性证明；反问题理论。"},
{id:"hilbert-space",n:"希尔伯特空间",c:"实变复变与泛函",s:"泛函分析",l:5,b:"core",p:["lp-space","inner-product"],d:"正交投影、Riesz 表示与基展开，最像欧氏空间的无穷维空间。",g:"掌握投影定理与正交基展开。",a:"最小二乘的一般框架；核方法（RKHS）的数学载体。"},
{id:"functional-analysis",n:"泛函分析",c:"实变复变与泛函",s:"泛函分析",l:5,b:"core",p:["banach-space","hilbert-space"],d:"对偶空间、弱收敛与谱理论，分析学的最终综合。",g:"理解对偶与弱拓扑的核心思想。",a:"优化对偶理论的严格框架；反问题与正则化。"},
{id:"spectrum",n:"谱理论初步",c:"实变复变与泛函",s:"泛函分析",l:5,b:"core",p:["functional-analysis"],d:"谱与预解式、紧算子谱定理，算子世界的光谱。",g:"概览谱定理与紧算子。",a:"量子力学的数学；图谱理论（图拉普拉斯）的延伸。"},
{id:"multivariable-calc",n:"多元微积分",c:"几何与拓扑",s:"多元分析",l:3,b:"core",p:["definite-integral","analytic-geo"],d:"偏导数、全微分、链式法则与多元极值，多变量世界。",g:"掌握偏导、多元极值与拉格朗日乘子法。",a:"多变量优化；反向传播链式法则的根源。"},
{id:"gradient-vector",n:"梯度与场论",c:"几何与拓扑",s:"多元分析",l:3,b:"core",p:["multivariable-calc"],d:"梯度、方向导数、散度与旋度，向量的场。",g:"理解梯度是最速上升方向及场论算子。",a:"梯度下降算法；物理场模拟。"},
{id:"multiple-integral",n:"重积分与曲线曲面积分",c:"几何与拓扑",s:"多元分析",l:4,b:"core",p:["multivariable-calc"],d:"二重三重积分、换元与线面积分，多维的累积。",g:"会计算重积分与典型线面积分。",a:"期望的多维计算；图像积分图（box blur）原理。"},
{id:"stokes",n:"格林高斯斯托克斯定理",c:"几何与拓扑",s:"多元分析",l:4,b:"core",p:["multiple-integral"],d:"场论三大积分公式，边界与内部的统一。",g:"理解三大公式及其几何统一。",a:"电磁学基础；微分形式直觉的起点。"},
{id:"ode-basic",n:"常微分方程",c:"几何与拓扑",s:"微分方程",l:4,b:"core",p:["definite-integral"],d:"一阶与二阶线性 ODE、特征方程，变化的规律。",g:"熟练求解主要类型（可分离/线性/常系数）。",a:"物理建模；梯度流（神经网络训练的 ODE 视角）。"},
{id:"ode-system",n:"微分方程组与稳定性",c:"几何与拓扑",s:"微分方程",l:5,b:"core",p:["ode-basic"],d:"相图、线性化与稳定性，系统的长期行为。",g:"掌握平衡点稳定性判据（李雅普诺夫思想）。",a:"种群模型；优化收敛动力学。"},
{id:"pde-basic",n:"偏微分方程",c:"几何与拓扑",s:"微分方程",l:5,b:"core",p:["ode-system","fourier-series"],d:"波动/热/位势三大经典方程与定解条件。",g:"掌握典型 PDE 的建模与分类（椭圆/抛物/双曲）。",a:"扩散模型（DDPM 的 SDE/ODE 视角）；图像去噪。"},
{id:"pde-solve",n:"偏微分方程解法",c:"几何与拓扑",s:"微分方程",l:5,b:"core",p:["pde-basic","fourier-transform"],d:"分离变量、傅里叶法与特征线法，PDE 的求解工具箱。",g:"会解典型线性方程。",a:"Black-Scholes 方程的求解；物理模拟引擎。"},
{id:"differential-geometry",n:"微分几何",c:"几何与拓扑",s:"几何",l:5,b:"core",p:["multivariable-calc","analytic-geo"],d:"曲线曲面、基本形式与曲率，弯曲空间的度量。",g:"掌握曲面曲率概念与测地线思想。",a:"几何深度学习；3D 视觉与形状分析。"},
{id:"topology-basic",n:"点集拓扑",c:"几何与拓扑",s:"拓扑",l:4,b:"core",p:["real-analysis","set-map"],d:"拓扑空间、开闭集、紧致与连通，连续性的最一般框架。",g:"掌握拓扑空间基本概念与紧致性。",a:"数据拓扑分析（TDA）；聚类与连通性理论。"},
{id:"algebraic-topology",n:"代数拓扑",c:"几何与拓扑",s:"拓扑",l:5,b:"core",p:["topology-basic","group-theory"],d:"基本群与同调，用代数不变量区分空间。",g:"概览同伦不变量思想与基本群计算。",a:"TDA 持久同调；高维数据的形状描述。"},
{id:"riemann-geometry",n:"黎曼几何与张量",c:"几何与拓扑",s:"几何",l:6,b:"core",p:["differential-geometry","linear-algebra"],d:"流形、黎曼度量、联络与曲率，现代几何的语言。",g:"掌握度量与曲率概念（概览张量计算）。",a:"广义相对论；几何深度学习（流形假设）。"},
{id:"prob-axiom",n:"概率公理化",c:"概率统计与随机",s:"概率论",l:3,b:"core",p:["prob-basic","set-map"],d:"概率空间、条件概率、独立性与贝叶斯公式，随机的严格语言。",g:"掌握概率公理化定义、条件概率与全概率/贝叶斯公式。",a:"贝叶斯推断；垃圾邮件过滤；诊断测试解释。"},
{id:"random-var",n:"随机变量与分布",c:"概率统计与随机",s:"概率论",l:3,b:"core",p:["prob-axiom"],d:"随机变量、分布函数与密度函数，把随机现象数值化。",g:"掌握分布函数性质与常见变换。",a:"概率建模；生成模型的采样与分布表达。"},
{id:"common-dist",n:"常见分布族",c:"概率统计与随机",s:"概率论",l:3,b:"core",p:["random-var"],d:"伯努利/二项/泊松/正态/指数/均匀分布及其场景。",g:"熟悉各分布参数、期望与典型场景。",a:"A/B 检验；排队模型；大模型采样的温度直觉。"},
{id:"expectation",n:"期望与方差",c:"概率统计与随机",s:"概率论",l:3,b:"core",p:["random-var","definite-integral"],d:"期望、方差、矩与矩生成函数，分布的「重心」与「宽度」。",g:"熟练计算期望方差，掌握其性质与矩生成函数。",a:"风险度量（期望收益/方差）；损失函数的期望。"},
{id:"law-large-num",n:"大数定律",c:"概率统计与随机",s:"极限定理",l:4,b:"core",p:["expectation"],d:"弱/强大数定律，频率收敛到概率的保证。",g:"理解收敛含义与条件。",a:"蒙特卡洛采样的合法性；大模型训练数据统计。"},
{id:"clt",n:"中心极限定理",c:"概率统计与随机",s:"极限定理",l:4,b:"core",p:["law-large-num"],d:"独立同分布的中心极限定理，正态无处不在的原因。",g:"理解正态出现机制与收敛速度。",a:"置信区间的基础；大量独立误差的聚合形态。"},
{id:"joint-dist",n:"随机向量与条件分布",c:"概率统计与随机",s:"概率论",l:4,b:"core",p:["expectation","multiple-integral"],d:"联合分布、边际、条件分布与协方差矩阵，多元随机。",g:"掌握多元正态与条件分布。",a:"多元高斯模型；潜变量模型与高斯过程。"},
{id:"markov-chain",n:"马尔可夫链",c:"概率统计与随机",s:"随机过程",l:4,b:"core",p:["random-var","linear-algebra"],d:"转移矩阵、平稳分布与遍历性，无记忆的随机演化。",g:"会求平稳分布并理解收敛条件。",a:"PageRank；LLM 的 next-token 视角；MCMC 基础。"},
{id:"mcmc",n:"马尔可夫链蒙特卡洛",c:"概率统计与随机",s:"随机过程",l:5,b:"core",p:["markov-chain","monte-carlo"],d:"Metropolis-Hastings 与吉布斯采样，从分布抽样的通用引擎。",g:"理解采样原理与收敛诊断。",a:"贝叶斯推断；扩散模型采样理论的近亲。"},
{id:"brownian-motion",n:"布朗运动",c:"概率统计与随机",s:"随机过程",l:5,b:"core",p:["clt","markov-chain"],d:"布朗运动的定义与路径性质，连续时间随机的原型。",g:"理解定义、独立增量与高斯性。",a:"金融资产价格模型；物理扩散；连续随机过程入口。"},
{id:"stochastic-calc",n:"随机积分与伊藤",c:"概率统计与随机",s:"随机过程",l:6,b:"core",p:["brownian-motion"],d:"伊藤积分、伊藤引理与随机微分方程，含噪声的微积分。",g:"掌握伊藤引理与简单 SDE 求解。",a:"期权定价；利率模型；扩散模型（SDE 视角）的理论根。"},
{id:"martingale",n:"鞅论",c:"概率统计与随机",s:"随机过程",l:6,b:"core",p:["expectation","brownian-motion"],d:"鞅、停时与可选停时定理，公平赌博的数学。",g:"理解鞅性质与基本定理。",a:"金融无套利论证；公平赌博模型。"},
{id:"bayesian-stat",n:"贝叶斯统计",c:"概率统计与随机",s:"统计推断",l:5,b:"core",p:["joint-dist","mcmc"],d:"先验、后验与贝叶斯推断框架，把不确定性持续更新。",g:"掌握共轭先验与后验计算思想。",a:"概率图模型推断；大模型不确定性的概率视角。"},
{id:"statistics-infer",n:"统计推断",c:"概率统计与随机",s:"统计推断",l:4,b:"core",p:["expectation","clt"],d:"参数估计、假设检验与置信区间，用样本说话。",g:"掌握 MLE、t 检验、p 值与区间估计。",a:"实验评估；指标显著性判断（A/B 测试方法论）。"},
{id:"data-viz",n:"数据可视化与探索",c:"概率统计与随机",s:"统计推断",l:3,b:"core",p:["stat-basic","linear-func"],d:"图表类型选择与可视化设计，让数据自己说话。",g:"能有效呈现数据与分布，读懂统计图。",a:"分析师日常；报告与论文图表；你正在看的这张图。"},
{id:"logic-proposition",n:"命题与谓词逻辑",c:"离散数学与计算",s:"逻辑",l:2,b:"core",p:["set-map"],d:"命题连接词、量词与范式，推理的形式化。",g:"会真值表与简单形式化推理。",a:"程序断言；数据库查询语义。"},
{id:"proof-methods",n:"证明方法",c:"离散数学与计算",s:"逻辑",l:3,b:"core",p:["logic-proposition","induction"],d:"直接/反证/归纳/构造证明，数学写作的核心技能。",g:"能独立写出严格证明。",a:"算法正确性证明；形式化验证。"},
{id:"graph-basic",n:"图论基础",c:"离散数学与计算",s:"图论",l:3,b:"core",p:["proof-methods","vector-basic"],d:"图、树、连通性与匹配，关系的抽象结构。",g:"掌握图基本概念、欧拉回路与树的性质。",a:"社交网络；知识图谱；电路网络。"},
{id:"graph-algorithm",n:"图算法",c:"离散数学与计算",s:"图论",l:4,b:"core",p:["graph-basic","induction"],d:"DFS/BFS、最短路、最小生成树与网络流。",g:"能实现并分析复杂度（你刷洛谷图论的核心）。",a:"路径规划；推荐系统的图传播；竞赛题。"},
{id:"combin-counting",n:"组合计数",c:"离散数学与计算",s:"组合数学",l:4,b:"core",p:["permute-combine","generating-func"],d:"容斥、递推与 Burnside 引理，精巧的计数艺术。",g:"掌握经典计数模型与容斥原理。",a:"概率精确计算；算法平均复杂度分析。"},
{id:"generating-func",n:"生成函数",c:"离散数学与计算",s:"组合数学",l:4,b:"core",p:["sequence","power-series"],d:"普通/指数生成函数，用幂级数解计数与递推。",g:"会用生成函数解递推关系。",a:"随机游走与概率母函数；竞赛组合的强力工具。"},
{id:"automata",n:"自动机与形式语言",c:"离散数学与计算",s:"计算理论",l:4,b:"core",p:["logic-proposition"],d:"DFA/NFA、正则语言与上下文无关文法，计算的有限模型。",g:"掌握泵引理与语言层级思想。",a:"正则表达式；词法分析；大模型 tokenizer 的理论背景。"},
{id:"computability",n:"可计算性",c:"离散数学与计算",s:"计算理论",l:5,b:"core",p:["automata"],d:"图灵机、停机问题与丘奇论题，什么能被计算。",g:"理解不可判定性及其证明。",a:"编译器与解释器理论；AI 能力边界的哲学基础。"},
{id:"complexity",n:"计算复杂度",c:"离散数学与计算",s:"计算理论",l:5,b:"core",p:["computability","graph-algorithm"],d:"P/NP、归约与 NP 完全，什么能被高效计算。",g:"掌握复杂度类框架与典型归约。",a:"算法选型；大模型推理开销的分析。"},
{id:"optimization-basic",n:"优化问题建模",c:"最优化与运筹",s:"优化理论",l:4,b:"core",p:["func-extreme","quadratic-form"],d:"目标函数、约束与局部/全局最优，把现实问题写成优化。",g:"能把实际问题翻译成优化形式。",a:"机器学习=优化的统一视角；资源配置；调度。"},
{id:"convex-basic",n:"凸集与凸函数",c:"最优化与运筹",s:"优化理论",l:4,b:"core",p:["optimization-basic","quadratic-form"],d:"凸性判定与 Jensen 不等式，局部最优=全局最优的保证。",g:"掌握凸性判定与凸优化的重要性。",a:"损失函数凸性分析；最优点唯一性的保证。"},
{id:"linear-program",n:"线性规划",c:"最优化与运筹",s:"优化理论",l:4,b:"core",p:["optimization-basic","linear-algebra"],d:"单纯形法、标准形与整数规划简介，约束优化的原型。",g:"会建模并理解单纯形思想。",a:"供应链优化；广告出价；排班调度。"},
{id:"duality",n:"对偶理论",c:"最优化与运筹",s:"优化理论",l:5,b:"core",p:["linear-program","functional-analysis"],d:"对偶问题与强对偶，从另一个角度看同一优化。",g:"理解对偶间隙与对偶变量的意义。",a:"SVM 对偶；资源影子价格；约束的定价。"},
{id:"kkt",n:"KKT条件",c:"最优化与运筹",s:"优化理论",l:5,b:"core",p:["duality","convex-basic"],d:"拉格朗日乘子法与 KKT 条件，约束优化的最优性判据。",g:"会写出并解释 KKT 系统。",a:"支持向量机；带约束的强化学习；经济学的拉格朗日。"},
{id:"convex-opt",n:"凸优化算法",c:"最优化与运筹",s:"优化理论",l:5,b:"core",p:["convex-basic","gradient-descent"],d:"梯度法收敛率、加速方法与内点法，凸优化的算法库。",g:"掌握收敛率概念与典型算法选择。",a:"机器学习训练的理论底座；信号恢复（压缩感知）。"},
{id:"gradient-descent",n:"梯度下降与变体",c:"最优化与运筹",s:"优化理论",l:5,b:"core",p:["gradient-vector","optimization-basic"],d:"梯度下降、动量、AdaGrad 与 Adam，沿最陡方向下山。",g:"能推导更新规则并理解各自动机。",a:"神经网络训练的核心引擎。"},
{id:"sgd",n:"随机梯度下降与在线学习",c:"最优化与运筹",s:"优化理论",l:5,b:"core",p:["gradient-descent","expectation"],d:"随机梯度、批量与噪声效应，用样本逼近梯度。",g:"理解 mini-batch 与收敛的权衡。",a:"大模型预训练；在线广告学习；一切现代训练器。"},
{id:"fourier-series",n:"傅里叶级数",c:"应用数学",s:"调和分析",l:4,b:"core",p:["trig-identity","power-series"],d:"正交函数系与周期函数展开，把波形拆成谐波。",g:"掌握典型展开与收敛概念。",a:"音频压缩；周期信号的频域分解；时间序列分解。"},
{id:"fourier-transform",n:"傅里叶变换",c:"应用数学",s:"调和分析",l:5,b:"core",p:["fourier-series","improper-integral"],d:"连续/离散傅里叶变换与卷积定理，频谱的世界。",g:"掌握变换对与卷积性质。",a:"信号处理；CNN 卷积的频域视角；注意力位置编码设计。"},
{id:"fft",n:"快速傅里叶变换",c:"应用数学",s:"调和分析",l:5,b:"core",p:["fourier-transform","complexity"],d:"蝶形算法的分治加速，O(n log n) 的频谱计算。",g:"理解分治加速原理。",a:"大整数乘法；音频渲染；多项式乘法。"},
{id:"info-theory",n:"信息论",c:"应用数学",s:"信息科学",l:5,b:"core",p:["exponent-log","prob-axiom"],d:"熵、联合熵、互信息与 KL 散度，信息的量化。",g:"掌握熵的定义与 KL 散度性质。",a:"压缩；交叉熵损失函数；互信息特征选择；VAE。"},
{id:"numerical-methods",n:"数值方法",c:"应用数学",s:"科学计算",l:5,b:"core",p:["taylor","linear-algebra"],d:"插值、数值积分与误差分析，让数学可计算。",g:"理解截断误差与舍入误差。",a:"科学计算；浮点训练的数值稳定性。"},
{id:"monte-carlo",n:"蒙特卡洛方法",c:"应用数学",s:"科学计算",l:5,b:"core",p:["law-large-num","random-var"],d:"随机模拟、方差缩减与重要性采样，用随机解决确定问题。",g:"掌握收敛性与误差控制。",a:"期权定价；大模型采样评估；贝叶斯后验计算。"},
{id:"dynamical-systems",n:"动力系统",c:"应用数学",s:"动力学",l:5,b:"core",p:["ode-system","numerical-methods"],d:"流、不变集、分岔与混沌，系统的长期几何。",g:"概览混沌特征与分岔思想。",a:"神经网络动力系统视角；复杂系统与天气模型。"},
{id:"control-theory",n:"控制论基础",c:"应用数学",s:"动力学",l:6,b:"core",p:["ode-system","linear-algebra"],d:"反馈、能控能观与最优控制，让系统按目标行动。",g:"掌握反馈思想与线性系统控制基础。",a:"机器人；强化学习的经典根基；自动驾驶。"},
{id:"variational-calc",n:"变分法",c:"应用数学",s:"动力学",l:6,b:"core",p:["functional-analysis","pde-basic"],d:"欧拉-拉格朗日方程与泛函极值，函数空间的优化。",g:"掌握泛函极值思想。",a:"能量最小化；扩散模型分数匹配的理论近亲。"},
{id:"ml-basics",n:"机器学习基础",c:"AI 大模型方向",s:"机器学习",l:5,b:"ai",p:["sgd","statistics-infer","linear-algebra"],d:"监督/无监督框架、过拟合与偏差-方差权衡，AI 的起点。",g:"掌握数据划分、评估指标与模型选择。",a:"分类/回归/聚类等一切预测任务。"},
{id:"loss-func",n:"损失函数与正则化",c:"AI 大模型方向",s:"机器学习",l:5,b:"ai",p:["ml-basics","info-theory"],d:"交叉熵/MSE 与 L1/L2 正则化，训练目标的数学选择。",g:"理解损失函数选择理由与正则化效果。",a:"分类回归目标设计；缓解过拟合。"},
{id:"backprop",n:"反向传播与自动微分",c:"AI 大模型方向",s:"机器学习",l:5,b:"ai",p:["ml-basics","gradient-vector"],d:"链式法则、计算图与自动微分，梯度如何高效流动。",g:"能手推两层网络梯度，理解计算图。",a:"一切深度学习训练器的核心。"},
{id:"deep-learning",n:"深度学习基础",c:"AI 大模型方向",s:"深度学习",l:5,b:"ai",p:["backprop","svd"],d:"全连接、CNN、RNN 与激活函数，多层表示的力量。",g:"理解各结构动机与梯度传播路径。",a:"图像识别、语音与序列建模。"},
{id:"prob-graph",n:"概率图模型",c:"AI 大模型方向",s:"机器学习",l:5,b:"ai",p:["joint-dist","bayesian-stat"],d:"贝叶斯网络、HMM 与 CRF，结构化概率推理。",g:"掌握模型表示与推断思想。",a:"序列标注；语音识别；专家系统。"},
{id:"kernel-methods",n:"核方法",c:"AI 大模型方向",s:"机器学习",l:5,b:"ai",p:["hilbert-space","duality"],d:"核技巧与再生核希尔伯特空间，隐式的无限维映射。",g:"理解核=内积替换的本质。",a:"SVM；非线性分类；经典 ML 的巅峰。"},
{id:"pca-embedding",n:"降维与表示学习",c:"AI 大模型方向",s:"机器学习",l:5,b:"ai",p:["svd","clt"],d:"PCA、t-SNE 与 UMAP，高维数据的低维投影。",g:"理解降维语义与 PCA 的 SVD 实现。",a:"数据可视化；特征压缩；表示学习的先导。"},
{id:"representation-learning",n:"表征学习",c:"AI 大模型方向",s:"深度学习",l:6,b:"ai",p:["deep-learning","pca-embedding"],d:"自编码器、对比学习与预训练，学好的表示胜过好模型。",g:"理解表示为何重要与各类学习范式。",a:"预训练语言模型的根基；迁移学习。"},
{id:"transformer",n:"Transformer与注意力",c:"AI 大模型方向",s:"大模型",l:6,b:"ai",p:["deep-learning","fourier-transform"],d:"自注意力、多头机制与位置编码，并行化序列建模。",g:"能手推注意力矩阵运算与 QKV 变换。",a:"GPT/LLaMA 的核心架构；一切现代大模型。"},
{id:"llm-arch",n:"大模型架构",c:"AI 大模型方向",s:"大模型",l:6,b:"ai",p:["transformer"],d:"LayerNorm、残差、MoE 与 RMSNorm，规模化设计。",g:"理解各组件作用与扩展规律。",a:"大模型设计；推理服务；参数配置。"},
{id:"llm-training",n:"大模型训练",c:"AI 大模型方向",s:"大模型",l:6,b:"ai",p:["llm-arch","sgd"],d:"预训练目标、数据配比与缩放定律，算力与数据的艺术。",g:"掌握缩放定律直觉与训练管线。",a:"训练集群；数据工程；算力规划。"},
{id:"alignment",n:"对齐与RLHF",c:"AI 大模型方向",s:"大模型",l:6,b:"ai",p:["llm-training","control-theory","rl-basics"],d:"偏好数据、PPO/DPO 与奖励模型，让模型按人意图行动。",g:"理解对齐目标与算法差异。",a:"助手产品的安全与有用性。"},
{id:"diffusion",n:"扩散模型与生成式AI",c:"AI 大模型方向",s:"生成模型",l:6,b:"ai",p:["pde-basic","monte-carlo","deep-learning"],d:"前向加噪/反向去噪与 SDE/ODE 视角，从噪声造图像。",g:"掌握训练目标与采样流程。",a:"文生图、视频生成；Sora 类模型。"},
{id:"llm-inference",n:"大模型推理优化",c:"AI 大模型方向",s:"大模型",l:6,b:"ai",p:["llm-arch","fft"],d:"KV Cache、量化与投机采样，让生成更快更便宜。",g:"理解推理成本瓶颈与优化手段。",a:"模型部署；API 成本控制（你深有体会）。"},
{id:"crypto-app",n:"密码学与数学安全",c:"AI 大模型方向",s:"AI 安全",l:6,b:"ai",p:["modular-crypto","number-theory-basic"],d:"椭圆曲线、格密码与同态加密，数学即安全。",g:"概览现代密码学的数学基础。",a:"区块链；隐私计算；模型水印与安全。"},
{id:"geometric-deep-learning",n:"几何深度学习",c:"AI 大模型方向",s:"深度学习",l:6,b:"ai",p:["riemann-geometry","deep-learning"],d:"图神经网络、等变网络与流形方法，结构先验进模型。",g:"理解对称性与等变思想。",a:"分子建模；3D 场景理解；蛋白质结构预测。"},
{id:"self-supervised",n:"自监督学习",c:"AI 大模型方向",s:"深度学习",l:6,b:"ai",p:["representation-learning","transformer"],d:"掩码重建、对比与 next-token 预测，无标签的表示。",g:"理解各类自监督目标。",a:"BERT/GPT 预训练；CLIP 多模态。"},
{id:"rl-basics",n:"强化学习基础",c:"AI 大模型方向",s:"强化学习",l:6,b:"ai",p:["control-theory","ml-basics","markov-chain"],d:"MDP、贝尔曼方程与策略梯度，从交互中学习。",g:"掌握 MDP 建模与价值迭代。",a:"游戏 AI（AlphaGo）；RLHF 的技术根基；机器人。"},
{id:"time-value",n:"货币时间价值",c:"金融量化方向",s:"金融数学",l:4,b:"finance",p:["sequence","exponent-log"],d:"现值终值、贴现与年金，金融的第一性原理。",g:"熟练现金流折现与复利计算。",a:"公司估值 DCF；贷款分期；债券定价。"},
{id:"portfolio-theory",n:"投资组合理论",c:"金融量化方向",s:"组合管理",l:5,b:"finance",p:["expectation","time-value"],d:"均值-方差、有效前沿与马科维茨，分散化的数学。",g:"会算两资产组合与有效前沿。",a:"资产配置；量化组合构建；风险预算。"},
{id:"capm",n:"CAPM与因子模型",c:"金融量化方向",s:"组合管理",l:5,b:"finance",p:["portfolio-theory","linear-algebra"],d:"贝塔、夏普比率与多因子模型，风险如何定价。",g:"理解系统性风险定价与回归实现。",a:"权益定价；指数增强；业绩归因。"},
{id:"black-scholes",n:"期权定价与Black-Scholes",c:"金融量化方向",s:"衍生品",l:6,b:"finance",p:["stochastic-calc","pde-solve"],d:"复制组合、BS 方程与希腊字母，无套利定价的里程碑。",g:"会推导 BS 公式并理解希腊字母。",a:"衍生品定价；风险对冲；量化研究经典。"},
{id:"risk-metrics",n:"风险度量",c:"金融量化方向",s:"风险管理",l:5,b:"finance",p:["portfolio-theory","clt"],d:"VaR、CVaR 与压力测试，把风险量化成数字。",g:"会计算并比较风险指标。",a:"风控体系；监管资本；组合限额。"},
{id:"time-series",n:"时间序列分析",c:"金融量化方向",s:"量化建模",l:5,b:"finance",p:["statistics-infer","clt"],d:"平稳性、ARIMA 与协整，带时间戳的数据建模。",g:"掌握建模全流程（识别/估计/检验）。",a:"价格与宏观指标预测；配对交易的统计基础。"},
{id:"garch",n:"波动率模型",c:"金融量化方向",s:"量化建模",l:6,b:"finance",p:["time-series","expectation"],d:"ARCH/GARCH 与波动聚集，风险的时变结构。",g:"理解波动建模与估计。",a:"风险预测；期权隐含波动率分析。"},
{id:"factor-investing",n:"因子投资",c:"金融量化方向",s:"组合管理",l:6,b:"finance",p:["capm","time-series"],d:"价值/动量/质量因子与多因子模型，超额收益的来源。",g:"能评估因子有效性与组合构建。",a:"量化选股；smart beta 产品。"},
{id:"market-micro",n:"市场微结构与高频",c:"金融量化方向",s:"交易执行",l:6,b:"finance",p:["stochastic-calc","ml-basics"],d:"订单簿、执行成本与冲击模型，市场怎么运转。",g:"理解做市、限价单与滑点。",a:"高频交易；执行算法；流动性分析。"},
{id:"stat-arb",n:"统计套利",c:"金融量化方向",s:"交易执行",l:6,b:"finance",p:["time-series","factor-investing"],d:"配对交易与均值回归，利用统计规律获利。",g:"掌握配对策略构建与回测。",a:"市场中立策略；低风险收益来源。"},
{id:"ml-quant",n:"机器学习量化",c:"金融量化方向",s:"量化建模",l:6,b:"finance",p:["ml-basics","factor-investing","deep-learning"],d:"因子挖掘、树模型与序列 DL，AI 进量化。",g:"会构建特征-模型-回测闭环。",a:"量化研究员核心技能；另类数据预测。"},
{id:"rl-trading",n:"强化学习交易",c:"金融量化方向",s:"交易执行",l:6,b:"finance",p:["rl-basics","market-micro"],d:"强化学习与多臂老虎机在交易中的应用。",g:"理解 RL 在交易中的难点与适用场景。",a:"动态执行；自动做市；组合再平衡。"},
{id:"mc-pricing",n:"蒙特卡洛定价",c:"金融量化方向",s:"衍生品",l:6,b:"finance",p:["monte-carlo","black-scholes"],d:"路径模拟与美式期权定价，复杂衍生品的通用解法。",g:"会写简单路径模拟定价。",a:"复杂衍生品估值；风险中性测度下的模拟。"}
];
/* ================= 派生结构 ================= */
const idIndex = {};
NODES.forEach((n,i)=>{ idIndex[n.id]=i; });
function colorOf(cat){ return (CAT_MAP[cat]||CATS[0]).color; }
function branchLabel(b){ return b==="ai"?"AI 大模型":b==="finance"?"金融量化":"公共基础"; }

/* ================= 3D 布局（正四面体：L0→L6 沿高度 · 每层截面为三角点阵） ================= */
const TET_R=36, TET_H=43;
const CAT_ORDER=CATS.map(c=>c.c);
let LAYOUT=null;
// 6-三角网格格点（重心坐标 i+j+k=5，共 21 点），按离截面中心距离升序（中心留空、向外环展开）
const GRID=[];
for(let _i=0;_i<=5;_i++)for(let _j=0;_j<=5-_i;_j++){const _k=5-_i-_j; GRID.push([_i/5,_j/5,_k/5]);}
GRID.sort((p,q)=>{
  const d=p[0]-1/3, e=p[1]-1/3, f=p[2]-1/3;
  const g=q[0]-1/3, h=q[1]-1/3, i=q[2]-1/3;
  return (d*d+e*e+f*f)-(g*g+h*h+i*i);
});
function computeLayout3D(ids){
  const list=ids.map(id=>NODES[idIndex[id]]);
  const byLevel=[[],[],[],[],[],[],[]];
  list.forEach(n=>byLevel[n.l].push(n));
  // 底面等边三角形顶点（水平 y=0，外接圆半径 TET_R）
  const A=[];
  for(let e=0;e<3;e++){
    const a=e*2*Math.PI/3-Math.PI/2;
    A.push({x:Math.cos(a)*TET_R, z:Math.sin(a)*TET_R});
  }
  const pos={};
  byLevel.forEach((nodes,lv)=>{
    const t=(lv+0.5)/7;
    const y=t*TET_H;
    const scale=1-t*0.62;                       // 高层截面等比收缩（包络仍为正四面体）
    const T=A.map(v=>({x:v.x*scale, z:v.z*scale})); // 该层水平截面三角形顶点
    const groups={};
    nodes.forEach(n=>{ (groups[n.s]=groups[n.s]||[]).push(n); });
    // 簇排序：先大类（同色相邻）、再子类名 → 相邻簇取相邻格点
    const subs=Object.keys(groups).sort((a,b)=>{
      const ca=CAT_ORDER.indexOf(groups[a][0].c), cb=CAT_ORDER.indexOf(groups[b][0].c);
      return ca!==cb ? ca-cb : (a<b?-1:1);
    });
    subs.forEach((sub,si)=>{
      const w=GRID[si % GRID.length];
      const px=w[0]*T[0].x+w[1]*T[1].x+w[2]*T[2].x;
      const pz=w[0]*T[0].z+w[1]*T[1].z+w[2]*T[2].z;
      // 簇内节点沿「格点切线」错开（簇呈小线段，不侵入相邻簇）
      const rl=Math.hypot(px,pz)||1;
      const tx=-pz/rl, tz=px/rl;
      const arr=groups[sub].sort((a,b)=>a.id<b.id?-1:1);
      const N=arr.length;
      arr.forEach((n,i)=>{
        const off=(i-(N-1)/2)*1.1;
        pos[n.id]=[px+tx*off, y, pz+tz*off];
      });
    });
  });
  const px=Object.values(pos).map(p=>p[0]), py=Object.values(pos).map(p=>p[1]), pz=Object.values(pos).map(p=>p[2]);
  const min=(a)=>Math.min(...a), max=(a)=>Math.max(...a);
  const center=[(min(px)+max(px))/2,(min(py)+max(py))/2,(min(pz)+max(pz))/2];
  const radius=Math.max(max(px)-min(px), max(py)-min(py), max(pz)-min(pz))/2+3;
  return {pos, center, radius};
}

/* ================= Three.js 场景 ================= */
const chartEl=document.getElementById('chart');
let scene, camera, controls, renderer3D;
let meshes=new Map();       // id -> THREE.Mesh
let meshList=[];            // raycast 目标列表
let lineObj=null;
let basePositions={};
const raycaster=new THREE.Raycaster();

const GEO={
  core:new THREE.SphereGeometry(0.5,20,16),
  ai:new THREE.OctahedronGeometry(0.62),
  finance:new THREE.CylinderGeometry(0.42,0.42,1.0,16)
};
function geoOf(b){ return GEO[b]||GEO.core; }

function hex3(c){ const v=parseInt(c.slice(1),16); return [(v>>16&255)/255,(v>>8&255)/255,(v&255)/255]; }

function init3D(){
  let ok=true;
  try{ renderer3D=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'}); }
  catch(e){
    ok=false;
    chartEl.innerHTML='<div class="gl-fail">当前环境不支持 WebGL，无法渲染 3D 图谱。<br>请使用新版 Chrome / Edge / Safari / Firefox 打开。</div>';
  }
  if(!ok) return false;
  renderer3D.setPixelRatio(Math.min(window.devicePixelRatio||1,1.75));
  renderer3D.setSize(chartEl.clientWidth, chartEl.clientHeight);
  renderer3D.setClearColor(0x000000,0);
  chartEl.appendChild(renderer3D.domElement);
  scene=new THREE.Scene();
  camera=new THREE.PerspectiveCamera(45, chartEl.clientWidth/chartEl.clientHeight, 0.1, 2000);
  camera.position.set(50,34,58);
  controls=new THREE.OrbitControls(camera, renderer3D.domElement);
  controls.enableDamping=true; controls.dampingFactor=0.09;
  controls.minDistance=4; controls.maxDistance=460;
  scene.add(new THREE.AmbientLight(0x9aa8c9,0.85));
  const d1=new THREE.DirectionalLight(0xffffff,0.95); d1.position.set(70,95,50); scene.add(d1);
  const d2=new THREE.DirectionalLight(0x6f9fff,0.4); d2.position.set(-60,-30,-70); scene.add(d2);
  bind3DInput();
  requestAnimationFrame(loop);
  return true;
}

function loop(now){
  requestAnimationFrame(loop);
  controls.update();
  tickAnim(now);
  tickCam(now);
  tickLabels();
  renderer3D.render(scene,camera);
}

/* 标签距离 LOD：近处清晰、远处淡出，避免 154 个标签在全图视角糊成一团 */
function tickLabels(){
  if(!camera||!meshList.length) return;
  const cam=camera.position;
  for(let i=0;i<meshList.length;i++){
    const m=meshList[i], sp=m.userData.sprite;
    if(!sp||!sp.visible) continue;
    const base=sp.userData.op!==undefined?sp.userData.op:1;
    if(sp.userData.pinned){ sp.material.opacity=base; continue; }
    const d=cam.distanceTo(m.position);
    let k;
    if(d<45) k=1;
    else if(d<150) k=1-(d-45)/105*0.8;
    else k=0.2;
    sp.material.opacity=base*k;
  }
}

function clear3D(){
  meshes.forEach(m=>{
    scene.remove(m);
    if(m.material) m.material.dispose();
    if(m.userData&&m.userData.sprite){
      const sp=m.userData.sprite;
      if(sp.material){ sp.material.map&&sp.material.map.dispose(); sp.material.dispose(); }
    }
  });
  meshes.clear(); meshList=[]; basePositions={};
  if(lineObj){ scene.remove(lineObj); lineObj.geometry.dispose(); lineObj.material.dispose(); lineObj=null; }
}


/* ================= WebGL 标签（Sprite，无 DOM、天然透视、不拦截手势） ================= */
const SPRITE_H = chartEl.clientWidth<600?1.7:1.15;
function roundRect(ctx,x,y,w,h,r){
  ctx.beginPath();
  ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r);
  ctx.arcTo(x+w,y+h,x,y+h,r); ctx.arcTo(x,y+h,x,y,r);
  ctx.arcTo(x,y,x+w,y,r); ctx.closePath();
}
function makeLabelSprite(n, dim){
  const b=n.b;
  const base=26;
  const font='"PingFang SC","Microsoft YaHei",-apple-system,sans-serif';
  const c=document.createElement('canvas');
  const ctx=c.getContext('2d');
  ctx.font='600 '+base+'px '+font;
  const tw=Math.ceil(ctx.measureText(n.n).width);
  const padX=base*0.48, padY=base*0.38;
  const W=tw+padX*2, H=base+padY*2;
  const dpr=Math.min(window.devicePixelRatio||1,2);
  c.width=Math.ceil(W*dpr); c.height=Math.ceil(H*dpr);
  ctx.scale(dpr,dpr);
  ctx.font='600 '+base+'px '+font;
  const bg=b==='ai'?'rgba(244,114,182,.15)':b==='finance'?'rgba(251,191,36,.15)':'rgba(148,163,184,.12)';
  const bd=b==='ai'?'rgba(244,114,182,.5)':b==='finance'?'rgba(251,191,36,.45)':'rgba(148,163,184,.34)';
  ctx.fillStyle=bg; ctx.strokeStyle=bd; ctx.lineWidth=1;
  roundRect(ctx,0.5,0.5,W-1,H-1,H*0.34);
  ctx.fill(); ctx.stroke();
  ctx.fillStyle=b==='ai'?'#F5B7DE':b==='finance'?'#FBD97D':'#D8E1F0';
  ctx.textBaseline='middle';
  ctx.fillText(n.n, padX, H/2+1);
  const tex=new THREE.CanvasTexture(c);
  tex.minFilter=THREE.LinearFilter; tex.magFilter=THREE.LinearFilter;
  const mat=new THREE.SpriteMaterial({map:tex,transparent:true,depthWrite:false,opacity:dim?0.16:1});
  const sp=new THREE.Sprite(mat);
  sp.scale.set(SPRITE_H*W/H, SPRITE_H, 1);
  sp.userData.baseX=sp.scale.x;
  sp.userData.op=dim?0.16:1;
  return sp;
}
function nearestScreenNode(px,py){
  let best=null,bd=1e9;
  const v=new THREE.Vector3();
  for(const id of currentIds){
    const m=meshes.get(id); if(!m||!m.visible) continue;
    v.copy(m.position).project(camera);
    const sx=(v.x*0.5+0.5)*chartEl.clientWidth, sy=(-v.y*0.5+0.5)*chartEl.clientHeight;
    const d=Math.hypot(sx-px,sy-py);
    if(d<bd){bd=d;best=id;}
  }
  return bd<48?best:null;
}

function rebuild3D(ids, highlight, focusOnly){
  clear3D();
  LAYOUT=computeLayout3D(ids);
  const idset=new Set(ids);
  ids.forEach(id=>{
    const n=NODES[idIndex[id]];
    const col=colorOf(n.c);
    const hl=highlight&&(highlight.has(id)||highlight.has('@'+id));
    const dim=(highlight&&!hl&&state.selected!==id);
    const mat=new THREE.MeshLambertMaterial({
      color:col, emissive:col, emissiveIntensity:0.42,
      transparent:true, opacity:dim?0.1:1
    });
    const m=new THREE.Mesh(geoOf(n.b), mat);
    m.position.set(LAYOUT.pos[id][0], LAYOUT.pos[id][1], LAYOUT.pos[id][2]);
    m.userData.id=id;
    scene.add(m); meshes.set(id,m); meshList.push(m);
    const sp=makeLabelSprite(n, dim);
    if(hl) sp.userData.pinned=true;
    if(focusOnly && !hl) sp.visible=false;
    sp.position.set(0.95,0.28,0);
    m.add(sp);
    m.userData.sprite=sp;
  });
  const edges=[];
  ids.forEach(id=>{
    const n=NODES[idIndex[id]];
    (n.p||[]).forEach(pr=>{ if(idset.has(pr)) edges.push([pr,id]); });
  });
  if(edges.length){
    const pos=new Float32Array(edges.length*6);
    const col=new Float32Array(edges.length*6);
    edges.forEach((pair,i)=>{
      const pa=meshes.get(pair[0]), pb=meshes.get(pair[1]);
      if(!pa||!pb) return;
      const active=highlight&&(highlight.has(pair[1])||highlight.has('@'+pair[1]));
      const c=active?hex3(colorOf(NODES[idIndex[pair[1]]].c)):[0.42,0.52,0.74];
      pos.set([pa.position.x,pa.position.y,pa.position.z,pb.position.x,pb.position.y,pb.position.z],i*6);
      col.set(c.concat(c),i*6);
    });
    const g=new THREE.BufferGeometry();
    g.setAttribute('position',new THREE.BufferAttribute(pos,3));
    g.setAttribute('color',new THREE.BufferAttribute(col,3));
    const matL=new THREE.LineBasicMaterial({vertexColors:true,transparent:true,opacity:0.9});
    lineObj=new THREE.LineSegments(g,matL);
    scene.add(lineObj);
  }
  ids.forEach(id=>{ const m=meshes.get(id); if(m) basePositions[id]=m.position.clone(); });
}

/* ================= 入场动画（分批点亮） ================= */
let anim=null, gen=0;
function easeOutCubic(t){ return 1-Math.pow(1-t,3); }
function playIntro(){
  const ids=currentIds;
  const b1=ids.filter(id=>{const n=NODES[idIndex[id]];return n.b==='core'&&n.l<=3;});
  const b2=ids.filter(id=>{const n=NODES[idIndex[id]];return n.b==='core'&&n.l>3;});
  const b3=ids.filter(id=>NODES[idIndex[id]].b!=='core');
  const g=++gen;
  [b1,b2,b3].forEach((batch,i)=>{
    if(!batch.length) return;
    batch.forEach(id=>{
      const m=meshes.get(id); if(!m) return;
      m.visible=false; m.userData.sprite.visible=false;
    });
    setTimeout(()=>{
      if(g!==gen) return;
      batch.forEach(id=>{
        const m=meshes.get(id); if(!m) return;
        m.visible=true; m.scale.setScalar(0.001);
        m.position.y=basePositions[id].y-7;
        m.userData.sprite.visible=true;
      });
      anim={t0:performance.now(),dur:560,ids:batch,g:g};
    }, 180+i*430);
  });
}
function tickAnim(now){
  if(!anim){ return; }
  if(anim.g!==gen){ anim=null; return; }
  const k=Math.min(1,(now-anim.t0)/anim.dur), e=easeOutCubic(k);
  anim.ids.forEach(id=>{
    const m=meshes.get(id); if(!m) return;
    m.scale.setScalar(Math.max(0.001,e));
    m.position.y=basePositions[id].y-7*(1-e);
  });
  if(k>=1) anim=null;
}

/* ================= 相机 ================= */
let camTween=null;
function fitAll(){
  if(!LAYOUT) return;
  const c=LAYOUT.center, r=LAYOUT.radius;
  const aspect=chartEl.clientWidth/Math.max(1,chartEl.clientHeight);
  const k=aspect>=1?2.4:3.4;
  const dir=new THREE.Vector3(0.55,0.6,0.9).normalize();
  const target=new THREE.Vector3(c[0],c[1],c[2]);
  camera.position.copy(target.clone().addScaledVector(dir,r*k));
  controls.target.copy(target);
  camera.near=0.5; camera.far=r*9+40;
  camera.updateProjectionMatrix();
  controls.update();
}
function cameraFly(pos,look){
  camTween={t0:performance.now(),dur:640,
    fromP:camera.position.clone(), fromT:controls.target.clone(),
    toP:pos, toT:look};
}
function tickCam(now){
  if(!camTween) return;
  const k=Math.min(1,(now-camTween.t0)/camTween.dur), e=easeOutCubic(k);
  camera.position.lerpVectors(camTween.fromP,camTween.toP,e);
  controls.target.lerpVectors(camTween.fromT,camTween.toT,e);
  controls.update();
  if(k>=1) camTween=null;
}

/* ================= 3D 交互 ================= */
let downPos=null, hoverId=null, lastMove=0;
function toNDC(e){
  const r=chartEl.getBoundingClientRect();
  return {x:((e.clientX-r.left)/r.width)*2-1, y:-((e.clientY-r.top)/r.height)*2+1};
}
function setHover(id){
  if(hoverId===id) return;
  if(hoverId){
    const m=meshes.get(hoverId);
    if(m){ if(!anim) m.scale.setScalar(1); }
  }
  hoverId=id;
  if(id){
    const m=meshes.get(id);
    if(m){ if(!anim) m.scale.setScalar(1.35); }
    renderer3D.domElement.style.cursor='pointer';
  }else{
    renderer3D.domElement.style.cursor='grab';
  }
}
function bind3DInput(){
  const el=renderer3D.domElement;
  el.addEventListener('pointerdown',e=>{ downPos=[e.clientX,e.clientY]; });
  el.addEventListener('pointerup',e=>{
    if(!downPos) return;
    const dx=e.clientX-downPos[0], dy=e.clientY-downPos[1];
    downPos=null;
    if(Math.hypot(dx,dy)>6) return;
    const px=e.clientX-chartEl.getBoundingClientRect().left;
    const py=e.clientY-chartEl.getBoundingClientRect().top;
    raycaster.setFromCamera(toNDC(e),camera);
    const hits=raycaster.intersectObjects(meshList,false);
    if(hits.length) openDetail(hits[0].object.userData.id);
    else { const nid=nearestScreenNode(px,py); if(nid) openDetail(nid); else closeDetail(); }
  });
  el.addEventListener('pointermove',e=>{
    const t=performance.now();
    if(t-lastMove<50) return;
    lastMove=t;
    raycaster.setFromCamera(toNDC(e),camera);
    const hits=raycaster.intersectObjects(meshList,false);
    setHover(hits.length?hits[0].object.userData.id:null);
  });
  el.addEventListener('pointerleave',()=>setHover(null));
}

/* ================= 详情面板 ================= */
const detailEl=document.getElementById("detail");
function openDetail(id){
  state.selected=id;
  const n=NODES[idIndex[id]];
  const col=colorOf(n.c);
  const branchTag=n.b==="ai"?"tag branch-ai":n.b==="finance"?"tag branch-fin":"";
  const pre=(n.p||[]).map(p=>NODES[idIndex[p]]).filter(Boolean);
  const post=NODES.filter(o=>o.p&&o.p.includes(id));
  const preHtml=pre.length? pre.map(p=>`<span class="lk" data-go="${p.id}"><span class="lk-t">前置</span>${p.n}</span>`).join("")
                          : `<span class="lk empty"><span class="lk-t">前置</span>无（本阶段起点）</span>`;
  const postHtml=post.length? post.map(o=>`<span class="lk" data-go="${o.id}"><span class="lk-t">后续</span>${o.n}</span>`).join("")
                            : `<span class="lk empty"><span class="lk-t">后续</span>前沿/探索方向</span>`;
  detailEl.innerHTML=
    `<div class="d-head">
      <div class="d-title">
        <div class="d-name">${n.n}</div>
        <div class="d-meta">
          <span class="tag" style="color:${col};border-color:${col}55">${n.c}</span>
          <span class="tag">${n.s}</span>
          <span class="tag lv">L${n.l}</span>
          <span class="tag ${branchTag}">${branchLabel(n.b)}</span>
        </div>
      </div>
      <button class="d-close" id="dClose" aria-label="关闭"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
    </div>
    <div class="d-sec"><h4>节点介绍</h4><p>${n.d}</p></div>
    <div class="d-sec"><h4>学什么 · 掌握到什么程度</h4><p>${n.g}</p></div>
    <div class="d-sec"><h4>前置知识</h4><div class="links">${preHtml}</div></div>
    <div class="d-sec"><h4>后置方向</h4><div class="links">${postHtml}</div></div>
    <div class="d-sec"><h4>具体应用</h4><p>${n.a}</p></div>
    <div class="d-hint">点击「前置 / 后续」标签可跳转并高亮该节点的依赖链。</div>`;
  detailEl.classList.add("open");
  detailEl.querySelector("#dClose").onclick=()=>{ closeDetail(); };
  detailEl.querySelectorAll(".lk[data-go]").forEach(el2=>{
    el2.onclick=()=>{ jumpTo(el2.getAttribute("data-go")); };
  });
  render();
}
function closeDetail(){
  state.selected=null;
  detailEl.classList.remove("open");
  render();
}
function jumpTo(id){
  openDetail(id);
  const m=meshes.get(id);
  if(m){
    const p=m.position;
    cameraFly(p.clone().add(new THREE.Vector3(4.4,2.4,4.4)), p.clone());
  }
}

/* ================= 状态 / 渲染 / 统计 ================= */
let state={
  q:"", branch:"all", levels:new Set([0,1,2,3,4,5,6]),
  cats:new Set(CATS.map(k=>k.c)), selected:null
};
function visibleIds(){
  return NODES.filter(n=>{
    if(state.branch!=="all" && n.b!==state.branch) return false;
    if(!state.levels.has(n.l)) return false;
    if(!state.cats.has(n.c)) return false;
    return true;
  }).map(n=>n.id);
}
let currentIds=[], firstPaint=true, pendingFit=false;
const reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function render(){
  const ids=visibleIds();
  currentIds=ids;
  const sel=state.selected;
  let highlight=null;
  if(state.q.trim()){
    highlight=new Set();
    ids.forEach(id=>{
      const n=NODES[idIndex[id]];
      if((n.n+n.s+n.c+n.d+n.a).indexOf(state.q)>-1) highlight.add(id);
    });
  }else if(sel){
    highlight=new Set();
    const n=NODES[idIndex[sel]];
    (n.p||[]).forEach(x=>{highlight.add(x);highlight.add('@'+x);});
    NODES.forEach(o=>{ if(o.p&&o.p.includes(sel)) highlight.add(o.id); });
  }
  rebuild3D(ids, highlight, state.q.trim()!=="");
  updateStats();
  if(firstPaint){
    firstPaint=false;
    fitAll();
    if(!reduceMotion) playIntro();
  }else if(pendingFit){
    pendingFit=false;
    fitAll();
  }
}

function updateStats(){
  const ids=visibleIds();
  let edge=0;
  ids.forEach(id=>{ (NODES[idIndex[id]].p||[]).forEach(p=>{ if(ids.includes(p)) edge++; }); });
  const el=document.getElementById("stats");
  el.innerHTML=
    `<span class="stat"><b>${ids.length}</b> 个知识节点</span>`+
    `<span class="stat"><b>${edge}</b> 条依赖边</span>`+
    `<span class="stat"><b>${CATS.length}</b> 个大类</span>`+
    `<span class="stat"><span class="dot" style="background:#F472B6"></span>AI 大模型路径</span>`+
    `<span class="stat"><span class="dot" style="background:#FBBF24"></span>金融量化路径</span>`;
}

/* ================= 控件 ================= */
function buildControls(){
  const br=document.getElementById("branchRow");
  [["all","全部路径"],["core","公共基础"],["ai","AI 大模型"],["finance","金融量化"]].forEach((v,lab)=>{
    const c=document.createElement("span");
    c.className="chip"+(state.branch===v?" on":"");
    c.textContent=lab;
    c.onclick=()=>{
      state.branch=v;
      document.querySelectorAll("#branchRow .chip").forEach(x=>x.classList.remove("on"));
      c.classList.add("on");
      closeDetail(); render();
    };
    br.appendChild(c);
  });
  const lr=document.getElementById("levelRow");
  ["L0 数与运算","L1 初等数学","L2 高中阶段","L3 大学基础","L4 大学中级","L5 大学高级","L6 前沿研究"].forEach((lab,i)=>{
    const c=document.createElement("span");
    c.className="chip on";
    c.textContent=lab;
    c.onclick=()=>{
      if(state.levels.has(i)){ state.levels.delete(i); c.classList.remove("on"); }
      else{ state.levels.add(i); c.classList.add("on"); }
      closeDetail(); render();
    };
    lr.appendChild(c);
  });
  const cr=document.getElementById("catRow");
  CATS.forEach(k=>{
    const c=document.createElement("span");
    c.className="chip cat-dot on";
    c.innerHTML=`<span class="cd" style="background:${k.color}"></span>${k.c}`;
    c.onclick=()=>{
      if(state.cats.has(k.c)){ state.cats.delete(k.c); c.classList.add("cat-off"); c.classList.remove("on"); }
      else{ state.cats.add(k.c); c.classList.remove("cat-off"); c.classList.add("on"); }
      closeDetail(); render();
    };
    cr.appendChild(c);
  });
  document.getElementById("lvBar").innerHTML=
    ["L0 数与运算 — 从计数、四则到数与量的基本感觉",
     "L1 初等数学 — 代数式、方程、几何与三角的入门体系",
     "L2 高中阶段 — 函数、数列、组合与概率统计的预科基础",
     "L3 大学基础 — 极限、微积分、线性代数的严格化起步",
     "L4 大学中级 — 多元分析、ODE、概率论、离散结构",
     "L5 大学高级 — 实变、复变、泛函、拓扑、凸优化",
     "L6 前沿研究 — 现代数学分支与 AI / 量化应用前沿"].map((t,i)=>
      `<span class="lv-item">${t.split(" — ")[0]}<i style="color:#fff"> · ${t.split(" — ")[1]}</i></span>`).join("");
  document.getElementById("q").oninput=e=>{
    state.q=e.target.value.trim();
    closeDetail(); render();
  };
  document.getElementById("resetBtn").onclick=()=>{
    state={q:"",branch:"all",levels:new Set([0,1,2,3,4,5,6]),
           cats:new Set(CATS.map(k=>k.c)), selected:null};
    document.getElementById("q").value="";
    document.querySelectorAll("#levelRow .chip").forEach(x=>x.classList.add("on"));
    document.querySelectorAll("#catRow .chip").forEach(x=>{x.classList.add("on");x.classList.remove("cat-off");});
    document.querySelectorAll("#branchRow .chip").forEach((x,i)=>x.classList.toggle("on",i===0));
    pendingFit=true;
    render();
  };
  document.getElementById("fitBtn").onclick=()=>{
    pendingFit=true;
    render();
  };
}

/* ================= 初始化 ================= */
buildControls();
const glOK=init3D();
if(glOK){
  render();
  window.addEventListener("resize",()=>{
    if(!renderer3D) return;
    const w=chartEl.clientWidth, h=chartEl.clientHeight;
    if(!w||!h) return;
    camera.aspect=w/h;
    camera.updateProjectionMatrix();
    renderer3D.setSize(w,h);
  });
}

