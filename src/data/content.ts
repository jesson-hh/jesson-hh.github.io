import type { Lang } from '../i18n/ui';

export interface LinkItem { label: string; href: string; }
export interface ProjectSection {
  heading: string;
  /** Optional intro paragraph. Can be plain text or a single string with line breaks. */
  body?: string;
  /** Optional bullet list rendered after the body. */
  bullets?: string[];
}
export interface Highlight { label: string; value: string; }
export interface Project {
  slug: string;
  category: string;
  title: string;
  summary: string;
  year: string;
  role: string;
  stack: string;
  context: string;
  thumb: string;
  inProgress?: boolean;
  /** Optional metric chips rendered under the cover image. */
  highlights?: Highlight[];
  links: LinkItem[];
  sections: ProjectSection[];
}
export interface Post {
  slug: string;
  date: string;
  title: string;
  summary: string;
  tag: string;
  reading: number;
  body: string[];
}
export interface Site {
  name: string;
  person: string;
  studioName: string;
  role: string;
  /** Astronomical coords decoration in hero (same in both langs, here for consistency). */
  coords: string;
  hero: { eyebrow: string; headlineHtml: string; lede: string; now: string };
  studio: { headlineHtml: string; body: string[]; note: string; offers: { k: string; title: string; desc: string }[] };
  about: { title: string; bio: string[]; location: string; facts: string[] };
  contact: { ctaHtml: string; email: string; links: LinkItem[] };
}

const GH = 'https://github.com/jesson-hh';
const COORDS = "RA 05h 35m 17s · DEC −05° 23' 28\" · α Orionis";

const projects: Record<Lang, Project[]> = {
  zh: [
    /* 1 ----------------------------------------------------------------- */
    {
      slug: 'agent-mesh',
      category: '系统研究 · 进行中',
      title: 'Agent 组网 — NATS + MCP facade 让 Agent 互联',
      summary: '在做的一项研究:让 Codex / Claude Code 这类 agent host 通过 NATS 消息总线 + MCP facade 在本地和跨设备之间组成 mesh,共享命令、任务和状态。已跑通 NATS loopback 基线、JetStream 命令事件、MCP Agent Host facade、Mac↔Win 转发、命令审批与白名单、远程 mesh 准入等 10 个实验。',
      year: '2026',
      role: '设计 · 实验',
      stack: 'NATS · JetStream · MCP · Codex CLI · PowerShell',
      context: '研究 · 进行中',
      thumb: '/stars/thumbs/agent-mesh.svg',
      inProgress: true,
      highlights: [
        { label: 'runtime 实验', value: '10 已跑通' },
        { label: 'transport', value: 'NATS · JetStream' },
        { label: 'coverage', value: 'Mac ↔ Win' },
        { label: 'status', value: '研究 · 进行中' },
      ],
      links: [],
      sections: [
        {
          heading: '背景',
          body: '同一个人,手上常常同时跑着 Codex、Claude Code 和别的 agent host;它们各自有进程、状态、命令日志,但彼此看不见。我想知道:能不能用消息总线加 MCP facade,让这些 agent 在本地和跨设备组成一张 mesh,共享命令、任务、状态,而不是各自孤岛。',
        },
        {
          heading: '方法',
          body: '把组网这件事拆成若干能独立成立的传输实验,每条路径都有 dated 文档 + PowerShell harness + JSON 证据,跑通后再讨论怎么收进统一原型。',
          bullets: [
            'NATS Core pub/sub + request/reply —— 低延迟的实时命令通道',
            'JetStream —— 命令事件的持久化、回放、审计',
            'MCP Agent Host facade —— 把控制面以 MCP 形式暴露给上游 agent',
            '研究阶段克隆 MCP 规范、A2A、AG-UI、openai/codex、cli-agent-orchestrator、headscale 等做设计对照',
          ],
        },
        {
          heading: '已跑通的传输实验',
          body: '每一条都是先证明能独立跑,再决定该不该接入主原型。',
          bullets: [
            'NATS loopback 基线 —— 跨进程 / 跨语言的最小可工作单元',
            'JetStream 命令事件 —— 把命令做成持久化事实,可回放、可追溯',
            'MCP Agent Host facade —— 上游 agent 通过 MCP 调度本地控制面',
            'Mac ↔ Win 转发 —— 跨设备命令路由,带白名单',
            'sidecar 命令审批 —— 命令被拦下来等用户裁决',
            '远程 mesh 准入 —— 异机加入时的握手与身份',
          ],
        },
        {
          heading: '设计原则',
          body: '研究阶段反复回到的几条原则,既是判断该不该接的尺,也是回避踩坑的护栏。',
          bullets: [
            '每条路径单独成实验,先跑通再讨论是否接入主原型',
            '上游 agent 只通过 MCP facade 看见 mesh,具体传输细节不暴露',
            '命令必须可审计 / 可回放 —— JetStream 是为这个选的',
            '跨设备先证明 Mac ↔ Win,因为这是我自己的日常场景',
          ],
        },
        {
          heading: '现状',
          body: '在 G:\\agent组网 进行中。10 个 runtime 实验已跑通,工程上正在做的是把单点实验整合成一个能用的本地原型。这里登记为进行中的研究,后续有进展会更新。',
        },
      ],
    },
    /* 2 ----------------------------------------------------------------- */
    {
      slug: 'financial-analyst',
      category: 'LLM Agents · 多智能体',
      title: '觀瀾 · A 股多智能体研报工作站',
      summary: 'A 股单只个股深度研究工作站:24 个智能体分四层信任域协作,十分钟内产出基本面 / 技术面 / 资金 / 量化 + 多空辩论的研报。已发到 PyPI(v1.0.6),712 测试。',
      year: '2026',
      role: '设计 · 实现',
      stack: 'Python · LLM 多家路由 · Qlib · HF Datasets',
      context: '开源 · PyPI · v1.0.6',
      thumb: '/stars/thumbs/financial-analyst.svg',
      highlights: [
        { label: 'agents', value: '24 · 4 信任域' },
        { label: 'tests', value: '712' },
        { label: 'release', value: 'PyPI · v1.0.6' },
        { label: '一份研报', value: '约 10 分钟' },
      ],
      links: [
        { label: '代码仓库', href: `${GH}/financial-analyst` },
        { label: 'PyPI', href: 'https://pypi.org/project/financial-analyst/' },
        { label: '数据集(HuggingFace)', href: 'https://huggingface.co/yifishbossman' },
        { label: '构建手记(中英)', href: `${GH}/financial-analyst/blob/main/docs/journey.md` },
      ],
      sections: [
        {
          heading: '背景',
          body: 'A 股研究信息散、噪声大,一个人很难同时盯住基本面、技术面与资金面。我想要一个能像团队一样协作的系统:多个智能体各司其职,产出一份可以复核的研报——不是黑盒,是能逐层追问的链路。',
        },
        {
          heading: '方法',
          body: '24 个智能体分四层信任域,把"接触不可信内容的能力"和"决定写什么的权力"在结构上隔离开。每一层职责不同,信任级别不同,文件读写权限也不同。',
          bullets: [
            '数据层 —— 负责读取不可信的新闻 / F10,用 JSON schema 锁死输出,只能进结构化字段',
            '分析层 —— 基本面 / 技术面 / 资金情绪 / 量化,每条线一个或几个 agent',
            '决策层 —— 多空双方 + 风控官 + report-writer,只有 report-writer 能写文件',
            'introspector —— 第四层 agent 做自审,检查前三层有没有 bug',
          ],
        },
        {
          heading: '关键设计',
          body: '量化系统对记忆的依赖比想象的高 —— 错误一旦写进去会复利。',
          bullets: [
            '单写者模式 —— 24 个 agent 里只有 report-writer 能落盘,避免互相打架',
            '可插拔的 markdown 记忆 + FTS5 检索 —— 每个 agent 有自己的小记忆库',
            'Dream loop 自迭代 —— 用过往研报加实际价格做经验回写,但坚持人工审核,绝不 auto-accept',
            'JSON schema 锁死外部内容入口 —— 不可信文本进不了下游决策',
          ],
        },
        {
          heading: '工程亮点',
          body: '能让人真用起来的细节,往往比模型本身重要。',
          bullets: [
            '`fa start` 一行启动:向导 + 后端 + Web UI + 自动开浏览器',
            '31 个 buddy 工具 / 5 个 swarm 预设,场景化复用',
            '4 家 LLM 热切换(qwen / deepseek / openai / anthropic),Aliyun Bailian 1M 免费 token 大约够 150 份报告',
            '数据集托管 HuggingFace:demo 155 MB / lite 3 GB / full 14 GB,CN 用户走 hf-mirror 或 ModelScope 加速 3-10 倍',
          ],
        },
        {
          heading: '现状',
          body: '已发到 PyPI 稳定版(v1.0.6),712 测试通过。代码、PyPI、数据集、构建手记四处入口对外。',
        },
      ],
    },
    /* 3 ----------------------------------------------------------------- */
    {
      slug: 'oss-scout',
      category: 'MCP · 工具',
      title: 'OSS-Scout — 个性化开源项目发现 MCP',
      summary: '8 个 MCP 工具(刷新源、看 profile、设置 GitHub 身份、按口味排序、标记 useful / noise、归档搜索),从 GitHub Trending / HN / Trendshift 自动挑选符合你兴趣的新仓库。Profile 随反馈自动迭代版本,推荐越来越准。',
      year: '2026',
      role: '设计 · 实现',
      stack: 'Python · FastMCP · SQLite · GitHub API',
      context: '开源 · v0.4 已上线',
      thumb: '/stars/thumbs/oss-scout.svg',
      highlights: [
        { label: 'MCP 工具', value: '8 个' },
        { label: '源', value: 'Trending · HN · Trendshift' },
        { label: 'profile', value: '反馈即时迭代' },
        { label: 'release', value: 'v0.4 · 已上线' },
      ],
      links: [
        { label: '代码仓库', href: `${GH}/oss-scout` },
      ],
      sections: [
        {
          heading: '背景',
          body: '每天 GitHub Trending / Hacker News / Trendshift 上有几百个新仓库,但跟"我"相关的也就那么几个。想要一个能学习我口味的 scout,而不是一直手动 star / hide。',
        },
        {
          heading: '方法',
          body: 'MCP server 上挂 8 个工具,行为面拆得很细:抓取、排序、反馈、归档各管一摊。Profile 是一份会随用户反馈自迭代的口味档案,版本号 monotonic 单增。',
          bullets: [
            '`refresh_now` —— 显式拉取,不藏在 search 里(防止 search 静悄悄触发副作用)',
            '`show_profile` / `update_profile` —— 看 / 改当前口味',
            '`set_github_user` —— 可选拉 starred 仓库作为初始口味信号',
            '`find_relevant_new` —— 按当前 profile 给候选打分排序',
            '`mark_useful` / `mark_noise` —— 反馈,触发 profile_version 加一',
            '`search_archive` —— 翻历史归档',
          ],
        },
        {
          heading: '关键决策',
          body: '把"读取"和"动状态"显式分开,是这个 MCP 设计上最重要的一条。',
          bullets: [
            '显式 refresh,不在 search 里偷偷拉新 —— search 该幂等,刷新该是另一个动作',
            '每次反馈把 profile_version 加一,下次评分立刻变化(用户能看见自己的反馈生效)',
            '评分先用启发式做兜底,本地 Ollama 升级好之后挂模型分(可换不黑)',
            'Scouts(Trending / HN / Trendshift)是 Protocol 接口,源易换',
          ],
        },
        {
          heading: '复盘',
          body: '推荐系统最大的诱惑是把所有逻辑塞进一个大模型,但真正能用的版本往往恰恰相反。',
          bullets: [
            '小工具 + 显式动作,比"一个万能 search"好用',
            '让用户能看见自己反馈生效,信任就立起来了',
            '本地优先 —— profile 与归档都在 SQLite,反馈无延迟',
          ],
        },
        {
          heading: '现状',
          body: 'v0.4 已在 Claude Code user scope 上线,8 个工具实跑。打分器目前是启发式,等本地 Ollama 升级后挂模型分;Profile 持久化在 SQLite,反馈即时生效。',
        },
      ],
    },
    /* 4 ----------------------------------------------------------------- */
    {
      slug: 'project-experience-mcp',
      category: 'MCP · Agent 基础设施',
      title: '记忆共享 · 跨 Agent 的项目经验沉淀 MCP',
      summary: '让 Claude / Codex 等不同 agent host 共享同一份"做过什么"的本地记忆。挖项目证据 → 候选 → 精炼经验卡,SQLite + FTS5 + 自动脱敏,通过 MCP 统一暴露 search / get / evidence-pack 几个工具。',
      year: '2026',
      role: '设计 · 实现',
      stack: 'Python · FastMCP · SQLite/FTS5 · codesearch',
      context: '开源 · 本地优先',
      thumb: '/stars/thumbs/memory-share.svg',
      highlights: [
        { label: 'MCP 工具', value: '9 个' },
        { label: '存储', value: 'SQLite + FTS5' },
        { label: '已挖矿项目', value: '7+' },
        { label: '部署', value: 'local-first · 脱敏' },
      ],
      links: [],
      sections: [
        {
          heading: '背景',
          body: 'Claude、Codex、其他 agent host 各自跑各自的,但它们都在同一台机器上对同一批仓库做工作。复用经验本该很自然,但每个 agent 都重新爬一遍代码、再让模型从头总结,既慢又贵。我想要的是一层"项目经验"的共享记忆:把"做过的事"提炼成 reusable pattern,所有 agent 直接 search / get。',
        },
        {
          heading: '方法',
          body: '把"挖"和"综合"分开。挖矿器跑成本低(只采证据,不调模型),综合靠 agent 在小包上做(贵但精),两边解耦后任何 agent 都能在已经收集好的证据上下文里做卡片。',
          bullets: [
            'Miner —— 注册项目,按主题(rag / mcp-tools / llm-api / agent-runtime …)抓焦点文件 + codesearch 命中,过滤忽略路径,脱敏后写成 bounded evidence pack',
            'Agent 综合 —— 只对这一小包做综合,产出验证过的 markdown 经验卡',
            '卡和证据都进 SQLite + FTS5,通过 MCP 暴露给所有 agent host',
          ],
        },
        {
          heading: '9 个 MCP 工具',
          body: '工具粒度刻意做小,每个工具单一职责,组合性强。',
          bullets: [
            '`list_projects` / `mine_experience_candidates` —— 项目登记 + 主题挖矿',
            '`list_candidates` / `set_candidate_status` —— 候选状态(new / carded / rejected)流转',
            '`search_experience` / `get_experience` —— 卡片查与读',
            '`upsert_experience_card` —— 写卡入库',
            '`get_evidence_pack` —— 取小包给 agent 做综合',
            '`archive_experience` —— 归档历史',
          ],
        },
        {
          heading: '关键设计',
          body: '本地优先、脱敏、可溯源是这个 MCP 的三块基石。',
          bullets: [
            '挖矿和综合分离 —— 挖矿便宜,综合贵,谁需要谁来综合,不重复',
            '证据 bounded —— 每张卡的支撑材料有上限,防止 agent 被无关上下文淹没',
            '自动脱敏 —— 路径过滤 + 密钥模式识别,绝不进入证据包',
            '候选状态机 —— new → carded / rejected,留下决策痕迹',
          ],
        },
        {
          heading: '现状',
          body: '已在多个真实项目上完成挖掘加卡片沉淀:financial-analyst、weekly-agentmemory、memory-share、personalized-repo-mcp、paper-distiller、pde-phase8/10、ceramic-ai-predict 等。卡片支持搜索 / 归档,候选支持状态流转。',
        },
      ],
    },
    /* 5 ----------------------------------------------------------------- */
    {
      slug: 'paper-distiller',
      category: 'LLM Agents · 研究工具',
      title: 'Paper Distiller — arXiv 论文蒸馏对话 agent',
      summary: '对话式研究 agent:搜索 → 深度蒸馏 → 交叉引用证明,把 arXiv 论文变成可检索、可互链的 markdown 知识库(Obsidian 兼容),内置约 170 万篇的本地镜像。',
      year: '2026',
      role: '设计 · 实现',
      stack: 'Python · LLM · RAG · SQLite / FTS5',
      context: '开源 · PyPI / MIT',
      thumb: '/stars/thumbs/paper-distiller.svg',
      highlights: [
        { label: '本地镜像', value: '~1.7M 篇 arXiv' },
        { label: 'LLM 工具', value: '7 个' },
        { label: '深度蒸馏成本', value: '~¥0.04 / 篇' },
        { label: 'tests', value: '436' },
      ],
      links: [
        { label: '代码仓库', href: `${GH}/paper-distiller` },
        { label: 'PyPI', href: 'https://pypi.org/project/paper-distiller/' },
      ],
      sections: [
        {
          heading: '背景',
          body: '读论文最耗时的,是把一篇真正"吃透"并和已读过的内容连起来。我想要一个对话式研究助手:用自然语言告诉它要什么,它自己决定调哪个工具,把论文蒸馏成可检索、可互链的知识库。',
        },
        {
          heading: '方法',
          body: '把"读—蒸—链—查"做成 7 个可被 LLM 调用的工具,本地起一个 ~1.7M 篇的 arXiv 镜像做检索底座,SQLite + FTS5 跑毫秒级查询。每篇产出 12 段式深度蒸馏 + 定理 / 技术的 proof sidecar。',
          bullets: [
            '搜索 —— 关键词 + 语义混合检索,在 ~1.7M 篇本地镜像里跑',
            '深度蒸馏 —— 12 段式固定结构,产出便于跨论文复用',
            'Proof sidecar —— 定理 / 技术单独挑出来,蒸馏时自动检索相关既有定理喂给模型',
            '问答 —— 在已蒸馏的论文上做精准 QA',
            '长程研究 —— 跨论文跨主题的批量综合',
          ],
        },
        {
          heading: '关键设计',
          body: '让全库的记号和命名慢慢收敛,是这个工具最得意的复利效应。',
          bullets: [
            '后蒸馏自动拉前文 —— 每篇蒸馏时检索相关的既有定理 / 技术喂给模型,记号自然对齐',
            'Obsidian 兼容输出 —— 蒸馏卡是 markdown + 双链,直接进 vault',
            '对话式入口 —— 不用记 CLI 参数,自然语言告诉它要什么',
            '成本可控 —— 深度蒸馏一篇约 ¥0.04,跑全库才有意义',
          ],
        },
        {
          heading: '复盘',
          body: '研究工具最容易掉进"功能很多但谁都不会用"的坑。这一项的取舍。',
          bullets: [
            '入口收到对话 —— 让 LLM 决定调哪个工具,而不是用户记参数',
            '蒸馏格式锁死 12 段 —— 看似限制,实际让跨论文复用变可能',
            '本地镜像不可省 —— 实时调 arXiv API 会慢且不稳',
          ],
        },
        {
          heading: '现状',
          body: '已发布到 PyPI(MIT),436 测试;支持多家 LLM provider;成本可控——深度蒸馏约 ¥0.04 / 篇。',
        },
      ],
    },
    /* 6 ----------------------------------------------------------------- */
    {
      slug: 'jarvis',
      category: '个人 Agent',
      title: 'Jarvis · 个人 Agent 系统',
      summary: '长期演进的个人 Agent,做我每天用得到的事——日历、写作、研究查询、内部工具调度,做一个"我自己用的助手"。',
      year: '2025 — 2026',
      role: '设计 · 实现',
      stack: 'Python · LLM · MCP · 自托管',
      context: '内部 · 自用',
      thumb: '/stars/thumbs/jarvis.svg',
      highlights: [
        { label: '运行', value: '本地 · 自托管' },
        { label: '语言版本', value: 'EN + CN 并行' },
        { label: '集成', value: 'MCP · 多 agent host' },
        { label: 'since', value: '2025' },
      ],
      links: [],
      sections: [
        {
          heading: '背景',
          body: 'AI 工具越多,反而越想要一个"住在自己机器上、能记住我习惯"的助手——不是再装一个新 app,而是能把已经在跑的工具(Claude Code / Codex / MCP server / 各种 CLI)统一调度起来。',
        },
        {
          heading: '方法',
          body: '一个长期演进的本地 Agent,EN 与 CN 两个版本并行(语料和指令习惯不同)。新能力先以小工具形式进 MCP,跑一段时间证明真有用,再决定要不要进 Jarvis 的常驻技能集。',
          bullets: [
            '日常调度 —— 日历、提醒、文件整理这类高频但单调的事',
            '研究查询 —— 帮我串好 paper-distiller / OSS-Scout / 记忆共享几个 MCP 的入口',
            '工作流串联 —— 把临时手写脚本沉淀成可复用的工作流',
            '双语版本并行 —— EN 和 CN 用的语料 / 指令习惯不同,各跑各的',
          ],
        },
        {
          heading: '设计取舍',
          body: '这一项不是 demo,是真在用,所以很多取舍跟外发型项目不同。',
          bullets: [
            '不打算外发 —— 个人 OS 不必通用,只要适配自己',
            '先做 MCP 工具,再决定要不要常驻 —— 让能力有试用期',
            '与其他项目共享底层 —— MCP server、common skills、agent-mesh 思路都跟这里互通',
          ],
        },
        {
          heading: '现状',
          body: '日常内部使用中。这一项更像是个人 OS 的演进,不打算外发,但很多沉淀(MCP server、common skills、agent-mesh 思路)都是从这里长出来的。',
        },
      ],
    },
  ],

  en: [
    /* 1 ----------------------------------------------------------------- */
    {
      slug: 'agent-mesh',
      category: 'Systems Research · In progress',
      title: 'Agent Mesh — Networking Agents With NATS + MCP',
      summary: 'Ongoing research: letting Codex / Claude Code-style agent hosts talk to each other over a NATS message bus with an MCP facade — a local and cross-device mesh that shares commands, tasks and status. Ten runtime experiments so far: NATS loopback baseline, JetStream command facts, MCP Agent-Host facade, Mac↔Win forwarding, command allowlists and sidecar approval, remote mesh preflight, and more.',
      year: '2026',
      role: 'Design · Experiments',
      stack: 'NATS · JetStream · MCP · Codex CLI · PowerShell',
      context: 'Research · In progress',
      thumb: '/stars/thumbs/agent-mesh.svg',
      inProgress: true,
      highlights: [
        { label: 'Runtime experiments', value: '10 passing' },
        { label: 'Transport', value: 'NATS · JetStream' },
        { label: 'Coverage', value: 'Mac ↔ Win' },
        { label: 'Status', value: 'Research · in progress' },
      ],
      links: [],
      sections: [
        {
          heading: 'Background',
          body: 'One person often runs several agent hosts side by side — Codex, Claude Code, and others — each with its own process, state and command log, but none aware of the others. I want to know: can a message bus plus an MCP facade turn these isolated agents into a mesh that shares commands, tasks and status, locally and across devices?',
        },
        {
          heading: 'Approach',
          body: 'Break the networking question into transport experiments that each stand on their own. Every path gets a dated doc, a PowerShell harness, and a JSON evidence trail; only once a path proves itself does it earn a seat in the unified prototype.',
          bullets: [
            'NATS Core pub/sub + request/reply — low-latency channel for live commands',
            'JetStream — durable, replayable, auditable command events',
            'MCP Agent-Host facade — exposes the control plane as MCP to upstream agents',
            'References cloned for comparison: the MCP spec, A2A, AG-UI, openai/codex, cli-agent-orchestrator, headscale',
          ],
        },
        {
          heading: 'Transport experiments that pass',
          body: 'Each one proves itself in isolation before any conversation about folding it into the main prototype.',
          bullets: [
            'NATS loopback baseline — the smallest cross-process / cross-language unit that works',
            'JetStream command facts — commands as durable, replayable, traceable events',
            'MCP Agent-Host facade — upstream agents drive the local control plane through MCP',
            'Mac ↔ Win forwarding — cross-device command routing with an allowlist',
            'Sidecar command approval — commands are held for user adjudication',
            'Remote mesh preflight — handshake and identity for a fresh host joining',
          ],
        },
        {
          heading: 'Design principles',
          body: 'A handful of principles the research keeps returning to — both as the yardstick for what to fold in and as the guardrail against well-known pitfalls.',
          bullets: [
            'Every transport path is its own experiment; prove it standalone before debating inclusion',
            'Upstream agents only see the mesh via the MCP facade; transport details stay below the line',
            'Commands must be auditable and replayable — that is why JetStream was chosen',
            'Cross-device starts with Mac ↔ Win because that is my own daily setup',
          ],
        },
        {
          heading: 'Status',
          body: 'Active work under G:\\agent组网. Ten runtime experiments pass; current effort is folding the standalone experiments into a usable local prototype. Logged here as in-progress research; will update as it lands.',
        },
      ],
    },
    /* 2 ----------------------------------------------------------------- */
    {
      slug: 'financial-analyst',
      category: 'LLM Agents · Multi-agent',
      title: '觀瀾 · Financial Analyst — A-Share Research Workstation',
      summary: 'A multi-agent A-share research workstation: 24 agents across four trust tiers produce a fundamentals / technicals / whale / quant + bull-bear debate report in about ten minutes. Published on PyPI (v1.0.6), 712 tests.',
      year: '2026',
      role: 'Design · Implementation',
      stack: 'Python · LLM (multi-provider) · Qlib · HF Datasets',
      context: 'Open source · PyPI · v1.0.6',
      thumb: '/stars/thumbs/financial-analyst.svg',
      highlights: [
        { label: 'Agents', value: '24 · 4 tiers' },
        { label: 'Tests', value: '712' },
        { label: 'Release', value: 'PyPI · v1.0.6' },
        { label: 'Time to report', value: '~10 min' },
      ],
      links: [
        { label: 'Source code', href: `${GH}/financial-analyst` },
        { label: 'PyPI', href: 'https://pypi.org/project/financial-analyst/' },
        { label: 'Datasets (HuggingFace)', href: 'https://huggingface.co/yifishbossman' },
        { label: 'Build journey (bilingual)', href: `${GH}/financial-analyst/blob/main/docs/journey.md` },
      ],
      sections: [
        {
          heading: 'Background',
          body: 'A-share research is noisy and fragmented; one person can hardly track fundamentals, technicals and capital flows at once. I wanted a system that collaborates like a team — many agents, each with a job — producing a report you can actually audit, not a black box but a chain you can interrogate layer by layer.',
        },
        {
          heading: 'Approach',
          body: '24 agents across four trust tiers, with "the ability to touch untrusted content" and "the authority to decide what to write" structurally separated. Each tier has a different job, a different trust level, and different file permissions.',
          bullets: [
            'Data tier — reads untrusted news / filings, output JSON-schema-locked into structured fields only',
            'Analyst tier — fundamental / technical / sentiment / quant; one or a few agents per track',
            'Decision tier — bull, bear, risk officer, report-writer (only the writer can touch files)',
            'Introspector — a fourth-tier agent doing self-audit on the first three',
          ],
        },
        {
          heading: 'Key design',
          body: 'Quant systems depend on memory more than they look like they do — a wrong belief, once written, compounds.',
          bullets: [
            'Single-writer pattern — out of 24 agents only report-writer touches disk, so they never fight',
            'Pluggable markdown memory + FTS5 retrieval — each agent carries its own small store',
            'Dream loop self-iteration — past reports plus real prices feed back into experience, but always behind human review; auto-accept is off',
            'JSON schema locks the untrusted-content entry point — raw text never reaches downstream decisions',
          ],
        },
        {
          heading: 'Engineering details',
          body: 'The bits that make people actually use it often matter more than the model itself.',
          bullets: [
            '`fa start` is a zero-config one-command launch (wizard + backend + Web UI + browser auto-opens)',
            '31 buddy tools and 5 swarm presets for scenario reuse',
            'Four LLM providers hot-swap (qwen / deepseek / openai / anthropic); Aliyun Bailian\'s 1M free-token credit covers ~150 reports',
            'Datasets on HuggingFace — demo 155 MB / lite 3 GB / full 14 GB; CN users get 3-10× speedup via hf-mirror or ModelScope',
          ],
        },
        {
          heading: 'Status',
          body: 'Stable release on PyPI (v1.0.6) with 712 tests passing. Source, PyPI, datasets, and the bilingual build journey all open.',
        },
      ],
    },
    /* 3 ----------------------------------------------------------------- */
    {
      slug: 'oss-scout',
      category: 'MCP · Tooling',
      title: 'OSS-Scout — Personalized Open-Source Discovery MCP',
      summary: 'Eight MCP tools (refresh sources, show / update profile, set GitHub identity, rank by taste, mark useful / noise, archive search) that pick new repos matching your interests from GitHub Trending / HN / Trendshift. Profile version bumps on every feedback, so recommendations sharpen over time.',
      year: '2026',
      role: 'Design · Implementation',
      stack: 'Python · FastMCP · SQLite · GitHub API',
      context: 'Open source · v0.4 live',
      thumb: '/stars/thumbs/oss-scout.svg',
      highlights: [
        { label: 'MCP tools', value: '8' },
        { label: 'Sources', value: 'Trending · HN · Trendshift' },
        { label: 'Profile', value: 'feedback-driven' },
        { label: 'Release', value: 'v0.4 · live' },
      ],
      links: [
        { label: 'Source code', href: `${GH}/oss-scout` },
      ],
      sections: [
        {
          heading: 'Background',
          body: 'Every day Trending / Hacker News / Trendshift push hundreds of new repos at you; maybe a handful are actually relevant. I wanted a scout that learns my taste instead of forever manually starring or hiding.',
        },
        {
          heading: 'Approach',
          body: 'Eight MCP tools on a thin server, each with a single job — fetching, ranking, feedback, archival never mixed. The profile is a taste file that self-revises with every piece of feedback; the version number is monotonic.',
          bullets: [
            '`refresh_now` — explicit pull, not hidden inside search (so search has no silent side effects)',
            '`show_profile` / `update_profile` — view and edit current taste',
            '`set_github_user` — optionally pull starred repos as an initial taste signal',
            '`find_relevant_new` — rank candidates by current profile',
            '`mark_useful` / `mark_noise` — feedback, bumps profile_version',
            '`search_archive` — search history',
          ],
        },
        {
          heading: 'Key choices',
          body: 'Separating "read" from "mutate state" is the single most important design call here.',
          bullets: [
            'Explicit refresh; never quietly pull inside search — search should be idempotent, refresh should be its own action',
            'Each feedback bumps profile_version so the next ranking changes immediately — users see their feedback take effect',
            'Heuristic scorer as the fallback; once the local Ollama upgrade lands a model scorer plugs in (swappable, not bound to one)',
            'Scouts (Trending / HN / Trendshift) are Protocol-based — sources are easy to swap',
          ],
        },
        {
          heading: 'Lessons',
          body: 'The temptation in any recommender is to stuff all logic into one big model. The version that actually works tends to do the opposite.',
          bullets: [
            'Small tools + explicit actions beat a single "do-everything search"',
            'When users can see their feedback take effect, trust builds quickly',
            'Local-first — profile and archive both live in SQLite, no feedback lag',
          ],
        },
        {
          heading: 'Status',
          body: 'v0.4 live in Claude Code user scope with all 8 tools shipping. The scorer is heuristic today and becomes model-based once the local model is in place; profile is persisted in SQLite and feedback applies on the spot.',
        },
      ],
    },
    /* 4 ----------------------------------------------------------------- */
    {
      slug: 'project-experience-mcp',
      category: 'MCP · Agent infrastructure',
      title: 'Shared Memory · Project Experience MCP',
      summary: 'A local shared memory of "what I have done" for Claude / Codex and any other agent host. Mines bounded project evidence → candidates → curated experience cards, stored in SQLite + FTS5 with secrets redacted, exposed as a small set of MCP tools.',
      year: '2026',
      role: 'Design · Implementation',
      stack: 'Python · FastMCP · SQLite / FTS5 · codesearch',
      context: 'Open source · local-first',
      thumb: '/stars/thumbs/memory-share.svg',
      highlights: [
        { label: 'MCP tools', value: '9' },
        { label: 'Storage', value: 'SQLite + FTS5' },
        { label: 'Mined projects', value: '7+' },
        { label: 'Deployment', value: 'local-first · redacted' },
      ],
      links: [],
      sections: [
        {
          heading: 'Background',
          body: 'Claude, Codex and other agent hosts all run on the same machine against the same repos, but they each re-crawl the code and re-summarise from scratch. That should be a shared memory: distil what was done into reusable patterns, then let every agent search / get it.',
        },
        {
          heading: 'Approach',
          body: 'Separate mining from synthesis. Mining is cheap (collects evidence only, no model calls); synthesis is done by an agent on a small evidence pack (expensive but precise). Decoupled, any agent host can author cards on already-collected context.',
          bullets: [
            'Miner — registers projects, fetches focus files + codesearch hits by topic (rag / mcp-tools / llm-api / agent-runtime …), filters ignored paths, redacts secrets, writes a bounded evidence pack',
            'Agent synthesis — condenses that small pack into a validated markdown card',
            'Cards and evidence live in SQLite + FTS5, exposed via MCP to every agent host',
          ],
        },
        {
          heading: 'Nine MCP tools',
          body: 'Tool granularity is deliberately small — each tool has a single job, so combinations stay clean.',
          bullets: [
            '`list_projects` / `mine_experience_candidates` — project registry + topic mining',
            '`list_candidates` / `set_candidate_status` — candidate flow (new / carded / rejected)',
            '`search_experience` / `get_experience` — search and read cards',
            '`upsert_experience_card` — write cards to the store',
            '`get_evidence_pack` — fetch a bounded pack for an agent to synthesise',
            '`archive_experience` — archive history',
          ],
        },
        {
          heading: 'Key design',
          body: 'Local-first, redacted, and traceable — the three foundations of this MCP.',
          bullets: [
            'Mining and synthesis split — mining cheap, synthesis costly; whoever needs a card synthesises one, no duplication',
            'Evidence is bounded — every card has a supporting-material cap so agents do not drown in context',
            'Automatic redaction — path filters + secret pattern detection, nothing sensitive enters the evidence pack',
            'Candidate state machine — new → carded / rejected, leaves a decision trail',
          ],
        },
        {
          heading: 'Status',
          body: 'Mined and carded across several real projects: financial-analyst, weekly-agentmemory, memory-share, personalized-repo-mcp, paper-distiller, pde-phase8/10, ceramic-ai-predict, and more. Cards support search / archive; candidates flow through new / carded / rejected states.',
        },
      ],
    },
    /* 5 ----------------------------------------------------------------- */
    {
      slug: 'paper-distiller',
      category: 'LLM Agents · Research tooling',
      title: 'Paper Distiller — A Conversational arXiv Research Agent',
      summary: 'A conversational agent: search → deep-distill → cross-reference proofs, turning arXiv papers into a searchable, interlinked markdown knowledge base (Obsidian-compatible) backed by a ~1.7M-paper local mirror.',
      year: '2026',
      role: 'Design · Implementation',
      stack: 'Python · LLM · RAG · SQLite / FTS5',
      context: 'Open source · PyPI / MIT',
      thumb: '/stars/thumbs/paper-distiller.svg',
      highlights: [
        { label: 'Local mirror', value: '~1.7M arXiv' },
        { label: 'LLM tools', value: '7' },
        { label: 'Deep distill cost', value: '~¥0.04 / paper' },
        { label: 'Tests', value: '436' },
      ],
      links: [
        { label: 'Source code', href: `${GH}/paper-distiller` },
        { label: 'PyPI', href: 'https://pypi.org/project/paper-distiller/' },
      ],
      sections: [
        {
          heading: 'Background',
          body: 'The slow part of reading papers is truly absorbing one and connecting it to what you have already read. I wanted a conversational assistant: tell it what you want in natural language, let it choose which tool to call, and have it distill papers into a searchable, interlinked knowledge base.',
        },
        {
          heading: 'Approach',
          body: 'Make "read — distill — link — query" into seven LLM-callable tools, sit on a ~1.7M-paper local arXiv mirror with SQLite + FTS5 for millisecond search, and emit a 12-section deep distillation plus a theorem / technique proof sidecar for every paper.',
          bullets: [
            'Search — keyword + semantic hybrid retrieval over the ~1.7M-paper local mirror',
            'Deep distill — 12 sections, fixed structure, so cross-paper reuse becomes possible',
            'Proof sidecar — theorems / techniques pulled out; later distillations auto-fetch related prior ones',
            'QA — precise question-answering on already-distilled papers',
            'Long research — batch synthesis across papers and topics',
          ],
        },
        {
          heading: 'Key design',
          body: 'The vault\'s notation and naming converge over time — the compounding effect this tool is most proud of.',
          bullets: [
            'Auto-pull-prior on each distillation — feed related existing theorems / techniques to the model, naming aligns naturally',
            'Obsidian-compatible output — distill cards are markdown + back-links, drop straight into a vault',
            'Conversational entry point — no CLI flags to memorise; tell the agent what you want',
            'Cost-controlled — ~¥0.04 per deep distill, which is what makes running the whole library meaningful',
          ],
        },
        {
          heading: 'Lessons',
          body: 'Research tooling falls easily into the "many features, no one uses any of them" trap. The trade-offs here.',
          bullets: [
            'Entry funneled to dialogue — let the LLM pick the tool, not the user memorising flags',
            'Distill format locked to 12 sections — looks like a limit, actually what makes cross-paper reuse work',
            'Local mirror is non-negotiable — hitting arXiv API in real time is slow and unstable',
          ],
        },
        {
          heading: 'Status',
          body: 'Published on PyPI (MIT) with 436 tests; supports multiple LLM providers; cost-controlled — a deep distillation runs about ¥0.04 per paper.',
        },
      ],
    },
    /* 6 ----------------------------------------------------------------- */
    {
      slug: 'jarvis',
      category: 'Personal agent',
      title: 'Jarvis · Personal Agent System',
      summary: 'A long-running personal agent that does the things I actually do daily — calendar, writing, research lookups, internal tool dispatch. The "assistant I write for myself", in two language flavours.',
      year: '2025 — 2026',
      role: 'Design · Implementation',
      stack: 'Python · LLM · MCP · self-hosted',
      context: 'Internal · personal use',
      thumb: '/stars/thumbs/jarvis.svg',
      highlights: [
        { label: 'Runs', value: 'local · self-hosted' },
        { label: 'Flavours', value: 'EN + CN parallel' },
        { label: 'Integration', value: 'MCP · multi-host' },
        { label: 'Since', value: '2025' },
      ],
      links: [],
      sections: [
        {
          heading: 'Background',
          body: 'The more AI tools I install, the more I want one that lives on my own machine and remembers how I work — instead of installing yet another app, an agent that orchestrates the tools I already run (Claude Code / Codex / MCP servers / various CLIs).',
        },
        {
          heading: 'Approach',
          body: 'A long-running local agent in two flavours, EN and CN — corpora and instruction habits differ enough to be worth two configurations. New capabilities land first as small MCP tools, prove themselves there, and only then graduate into Jarvis\'s resident skill set.',
          bullets: [
            'Daily scheduling — calendar, reminders, file organisation; the high-frequency, low-glamour stuff',
            'Research lookups — wires the entry points of paper-distiller / OSS-Scout / shared-memory MCPs',
            'Workflow chaining — yesterday\'s one-off scripts become today\'s reusable workflows',
            'EN + CN parallel — different corpora and instruction styles, each running its own configuration',
          ],
        },
        {
          heading: 'Design trade-offs',
          body: 'This one is not a demo — it is in real use, so a lot of trade-offs differ from outward-facing projects.',
          bullets: [
            'Not shipping externally — a personal OS does not need to generalise, only to fit me',
            '"Live as an MCP tool first, then earn residency" — every capability has a probation period',
            'Shares foundations with other projects — MCP servers, common skills, and the agent-mesh ideas all intersect here',
          ],
        },
        {
          heading: 'Status',
          body: 'In daily personal use. This one is more of a personal-OS that keeps evolving — not for distribution, but a lot of the other artefacts (MCP servers, common skills, the agent-mesh ideas) sprout from here.',
        },
      ],
    },
  ],
};

const posts: Record<Lang, Post[]> = {
  zh: [
    {
      slug: 'financial-analyst-journey',
      date: '2026 · 05',
      title: '从空仓库到稳定版:A 股多智能体研报系统两周复盘',
      summary: '记录 financial-analyst 的设计取舍——三层信任域、单写者模式、记忆的人工审核自迭代,以及为什么不做自动接受。',
      tag: '复盘',
      reading: 14,
      body: [
        '[ 这是一篇示例文章。仓库里其实已经有一份中英双语的 docs/journey.md,可以把它整理进来。]',
        '可以讲讲:为什么用三层信任域、把"读取不可信内容"隔离出来;单写者模式如何避免多 agent 互相打架;以及 dream 回路里"为什么坚持人工审核"。',
      ],
    },
    {
      slug: 'paper-distiller-design',
      date: '2026 · 03',
      title: '给 arXiv 论文做一个会"蒸馏"的对话 agent',
      summary: 'paper-distiller 的设计:本地镜像、12 段式深度蒸馏、跨论文证明检索,如何让全库的记号慢慢收敛。',
      tag: '工具',
      reading: 9,
      body: [
        '[ 示例文章正文占位。]',
        '可以展开:本地 arXiv 镜像怎么建、proof sidecar 的结构、以及"后续蒸馏自动检索既有定理"带来的复利效应。',
      ],
    },
  ],
  en: [
    {
      slug: 'financial-analyst-journey',
      date: '2026 · 05',
      title: 'From Empty Repo to Stable: Two Weeks Building a Multi-Agent Equity Workstation',
      summary: 'Design trade-offs in financial-analyst — three trust tiers, the single-writer pattern, human-reviewed memory self-iteration, and why auto-accept is off.',
      tag: 'Recap',
      reading: 14,
      body: [
        '[ Sample post. The repo already has a bilingual docs/journey.md you can fold in here. ]',
        'Worth covering: why three trust tiers and isolating "reading untrusted content"; how the single-writer pattern keeps agents from fighting; and why the dream loop insists on human review.',
      ],
    },
    {
      slug: 'paper-distiller-design',
      date: '2026 · 03',
      title: 'Building a Conversational Agent That Distills arXiv Papers',
      summary: 'The design of paper-distiller: a local mirror, 12-section deep distillation, and cross-paper proof retrieval that makes vault notation converge.',
      tag: 'Tooling',
      reading: 9,
      body: [
        '[ Sample post body placeholder. ]',
        'Expand on: building the local arXiv mirror, the proof-sidecar structure, and the compounding effect of auto-retrieving prior theorems on each new distillation.',
      ],
    },
  ],
};

const site: Record<Lang, Site> = {
  zh: {
    name: 'Orion',
    person: 'Yi Xu',
    studioName: 'Orion',
    role: '个人 AI 工作室 · Personal AI Studio',
    coords: COORDS,
    hero: {
      eyebrow: 'Orion · 个人 AI 工作室',
      headlineHtml: '把<em>喜欢的事</em>做成 Agent,把<em>想法</em>做成工具。',
      lede: 'Orion 是 Yi Xu 一个人的工作室。我在武汉大学做研究——扩散与生成模型的理论一面;研究之外,写自己用得上的 Agent 和工具。',
      now: '正在做 · A 股多智能体研报工作站 financial-analyst & arXiv 论文蒸馏 agent paper-distiller',
    },
    studio: {
      headlineHtml: 'Orion 是 <em>Yi Xu</em> 一个人的工作室。',
      body: [
        '我在武汉大学做研究,方向是扩散模型和生成模型的理论。',
        '同时也写 LLM 智能体和工具,大多是自己用得上的东西。',
      ],
      note: '在武汉 · 中英皆可',
      offers: [],
    },
    about: {
      title: '研究者、独立开发者,偶尔写点东西。',
      bio: [
        '[ 以下是我根据你的公开信息起草的,请你改成自己的话。] 我在武汉,做 AI 研究,方向偏向扩散模型 / 生成模型的理论一面——收敛、误差界、引导这些。',
        '研究之外,我喜欢把方法做成能用的东西:对话式的 arXiv 论文蒸馏 agent、A 股多智能体研报系统……对我来说,工具好不好用,是检验自己有没有真的理解的另一种方式。',
      ],
      location: '武汉大学 · UTC+8',
      facts: ['扩散 / 生成模型理论', 'LLM 多智能体', 'MCP', 'Python · PyTorch', 'RAG · FTS5', '开源'],
    },
    contact: {
      ctaHtml: '想聊聊天,或者只是打个招呼?',
      email: 'xuyi1030jesson@gmail.com',
      links: [
        { label: 'Email', href: 'mailto:xuyi1030jesson@gmail.com' },
        { label: 'GitHub', href: GH },
      ],
    },
  },
  en: {
    name: 'Orion',
    person: 'Yi Xu',
    studioName: 'Orion',
    role: 'Personal AI Studio',
    coords: COORDS,
    hero: {
      eyebrow: 'Orion · Personal AI Studio',
      headlineHtml: 'I turn <em>what I love</em> into agents, and my <em>ideas</em> into tools.',
      lede: 'Orion is a one-person studio by Yi Xu. I research diffusion and generative models at Wuhan University, and outside of research I build agents and tools I want to use myself.',
      now: 'Currently · financial-analyst, a multi-agent equity workstation, & paper-distiller, an arXiv distillation agent',
    },
    studio: {
      headlineHtml: 'Orion is a one-person studio by <em>Yi Xu</em>.',
      body: [
        'I research diffusion and generative-model theory at Wuhan University.',
        'I also build LLM agents and tools, mostly things I want to use myself.',
      ],
      note: 'Wuhan · EN / 中文',
      offers: [],
    },
    about: {
      title: 'Researcher, independent developer, occasional writer.',
      bio: [
        '[ Drafted from your public signals — please rewrite in your own words. ] I am based in Wuhan, doing AI research that leans toward the theory side of diffusion / generative models — convergence, error bounds, guidance.',
        'Beyond research I like turning methods into things people can use: a conversational arXiv distillation agent, a multi-agent equity workstation. For me, whether a tool is actually usable is another test of whether I truly understood the idea.',
      ],
      location: 'Wuhan University · UTC+8',
      facts: ['Diffusion / generative theory', 'LLM multi-agent', 'MCP', 'Python · PyTorch', 'RAG · FTS5', 'Open source'],
    },
    contact: {
      ctaHtml: 'Want to chat, or just say hi?',
      email: 'xuyi1030jesson@gmail.com',
      links: [
        { label: 'Email', href: 'mailto:xuyi1030jesson@gmail.com' },
        { label: 'GitHub', href: GH },
      ],
    },
  },
};

export const getSite = (lang: Lang): Site => site[lang];
export const getProjects = (lang: Lang): Project[] => projects[lang];
export const getProject = (lang: Lang, slug: string): Project | undefined =>
  projects[lang].find((p) => p.slug === slug);
export const getPosts = (lang: Lang): Post[] => posts[lang];
export const getPost = (lang: Lang, slug: string): Post | undefined =>
  posts[lang].find((p) => p.slug === slug);
