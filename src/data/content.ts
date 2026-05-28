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
      links: [],
      sections: [
        { heading: '背景', body: '同一个人,手上常常同时跑着 Codex、Claude Code 和别的 agent host;它们各自有进程、状态、命令日志,但彼此看不见。我想知道:能不能用消息总线 + MCP facade,让这些 agent 在本地和跨设备组成一张 mesh,共享命令、任务、状态,而不是各自孤岛。' },
        { heading: '方法', body: 'NATS 作为消息总线:Core pub/sub + request/reply 跑实时命令;JetStream 做命令事件的持久化与回放;Agent Host 控制面以 MCP facade 暴露给上游 agent。每条传输路径单独做一个实验:loopback 基线、JetStream 命令事实、Mac↔Win 转发、sidecar 命令审批、远程 mesh 准入、远程 SSH 调试……每个实验都有 dated 文档 + PowerShell harness + JSON 证据。研究阶段克隆 MCP 规范、A2A、AG-UI、openai/codex、cli-agent-orchestrator、headscale 等作为设计参考。' },
        { heading: '现状', body: '在 G:\\agent组网 进行中。10 个 runtime 实验已跑通,工程上正在做的是把单点实验整合成一个能用的本地原型。这里登记为进行中的研究,后续有进展会更新。' },
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
      links: [
        { label: '代码仓库', href: `${GH}/financial-analyst` },
        { label: 'PyPI', href: 'https://pypi.org/project/financial-analyst/' },
        { label: '数据集(HuggingFace)', href: 'https://huggingface.co/yifishbossman' },
        { label: '构建手记(中英)', href: `${GH}/financial-analyst/blob/main/docs/journey.md` },
      ],
      sections: [
        { heading: '背景', body: 'A 股研究信息散、噪声大,一个人很难同时盯住基本面、技术面与资金面。我想要一个能像团队一样协作的系统:多个智能体各司其职,产出一份可以复核的研报。' },
        { heading: '方法', body: '24 个智能体分四层信任域——数据层(部分负责读取不可信的新闻 / F10,用 JSON schema 锁死输出)、分析层(基本面 / 技术面 / 资金情绪 / 量化)、决策层(多空双方 + 风控官 + report-writer,只有 report-writer 能写文件)、第四层 introspector 做自审。每个 agent 有可插拔的 markdown 记忆 + FTS5 检索;dream loop 用过往研报和实际价格做经验自迭代,但坚持人工审核——错误的记忆在量化系统里会复利。' },
        { heading: '现状', body: '已发到 PyPI 稳定版(v1.0.6),712 测试;`fa start` 零配置一行启动(向导 + 后端 + Web UI + 浏览器自动打开);31 个 buddy 工具、5 个 swarm 预设。支持 4 家 LLM(qwen / deepseek / openai / anthropic)热切换,Aliyun Bailian 1M 免费 token 大约够 150 份报告。数据集托管在 HuggingFace(demo 155MB / lite 3GB / full 14GB),CN 用户走 hf-mirror 或 ModelScope 加速 3-10 倍。' },
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
      links: [
        { label: '代码仓库', href: `${GH}/oss-scout` },
      ],
      sections: [
        { heading: '背景', body: '每天 GitHub Trending / Hacker News / Trendshift 上有几百个新仓库,但跟"我"相关的也就那么几个。想要一个能学习我口味的 scout,而不是一直手动 star / hide。' },
        { heading: '方法', body: 'MCP server 上挂 8 个工具:`refresh_now`(显式拉取,不藏在 search 里)、`show_profile / update_profile`、`set_github_user`(可选拉 starred 作为口味信号)、`find_relevant_new`(按当前 profile 打分)、`mark_useful / mark_noise`(反馈)、`search_archive`。每次反馈把 profile_version 加一,下次评分立刻变化;评分用启发式做兜底,Ollama 在本地的话上模型分。Scout 各家(Trending / HN / Trendshift)是 Protocol 接口,易换。' },
        { heading: '现状', body: 'v0.4 已在 Claude Code user scope 上线,8 个工具实跑。打分器目前是启发式,等本地 Ollama 升级后挂模型分;Profile 持久化在 SQLite,反馈即时生效。' },
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
      links: [],
      sections: [
        { heading: '背景', body: 'Claude、Codex、其他 agent host 各自跑各自的,但它们都在同一台机器上对同一批仓库做工作。复用经验本来该很自然,但每个 agent 都重新爬一遍代码、再让模型从头总结,既慢又贵。我想要的是一层"项目经验"的共享记忆:把"做过的事"提炼成 reusable pattern,所有 agent 直接 search / get。' },
        { heading: '方法', body: '挖矿和综合分离。Miner 注册项目、按主题(rag / mcp-tools / llm-api / agent-runtime 等)抓焦点文件 + codesearch 命中,过滤忽略路径,脱敏后写成 bounded evidence pack。Agent 只对这一小包做综合,产出验证过的 markdown 经验卡。卡和证据都进 SQLite + FTS5,通过 MCP 暴露 `list_projects / search_experience / get_experience / get_evidence_pack / list_candidates / set_candidate_status / upsert_experience_card / mine_experience_candidates / archive_experience` 9 个工具。' },
        { heading: '现状', body: '已在多个真实项目上完成挖掘 + 卡片沉淀:financial-analyst、weekly-agentmemory、memory-share、personalized-repo-mcp、paper-distiller、pde-phase8/10、ceramic-ai-predict 等。卡片支持搜索/归档,候选支持 new / carded / rejected 状态流转。' },
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
      links: [
        { label: '代码仓库', href: `${GH}/paper-distiller` },
        { label: 'PyPI', href: 'https://pypi.org/project/paper-distiller/' },
      ],
      sections: [
        { heading: '背景', body: '读论文最耗时的,是把一篇真正"吃透"并和已读过的内容连起来。我想要一个对话式研究助手:用自然语言告诉它要什么,它自己决定调哪个工具,把论文蒸馏成可检索、可互链的知识库。' },
        { heading: '方法', body: '7 个可被 LLM 调用的工具(搜索 / 蒸馏 / 问答 / 长程研究 / 查证明等);本地 arXiv 镜像约 170 万篇,SQLite + FTS5 做毫秒级检索;每篇产出 12 段式深度蒸馏 + 定理 / 技术的 proof sidecar,后续蒸馏会自动检索相关的既有定理喂给模型,让全库的记号与技术命名逐渐收敛。输出是 Obsidian 兼容的 markdown。' },
        { heading: '现状', body: '已发布到 PyPI(MIT),436 测试;支持多家 LLM provider;成本可控——深度蒸馏约 ¥0.04 / 篇。' },
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
      links: [],
      sections: [
        { heading: '背景', body: 'AI 工具越多,反而越想要一个"住在自己机器上、能记住我习惯"的助手——不是再装一个新 app,而是能把已经在跑的工具(Claude Code / Codex / MCP server / 各种 CLI)统一调度起来。' },
        { heading: '方法', body: '一个长期演进的本地 Agent,EN 与 CN 两个版本并行(语料和指令习惯不同)。任务包括日常调度、研究查询、文件整理、把临时工具串联成可复用的工作流。新加的能力先以小工具进 MCP,再决定是否进 Jarvis 的常驻技能集。' },
        { heading: '现状', body: '日常内部使用中。这一项更像是个人 OS 的演进,不打算外发,但很多沉淀(MCP server、common skills、agent-mesh 思路)都是从这里长出来的。' },
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
      links: [],
      sections: [
        { heading: 'Background', body: 'One person often runs several agent hosts side by side — Codex, Claude Code, and others — each with its own process, state and command log, but none aware of the others. I want to know: can a message bus plus an MCP facade turn these isolated agents into a mesh that shares commands, tasks and status, locally and across devices?' },
        { heading: 'Approach', body: 'NATS as the bus: Core pub/sub and request/reply for live commands; JetStream for durable command events; the Agent-Host control plane exposed to upstream agents through an MCP facade. Every transport path is its own experiment: loopback baseline, JetStream command facts, Mac↔Win forwarding, sidecar command approval, remote mesh preflight, remote SSH debug — each with a dated doc, a PowerShell harness and JSON evidence. The research stage clones references like the MCP spec, A2A, AG-UI, openai/codex, cli-agent-orchestrator and headscale for comparison.' },
        { heading: 'Status', body: 'Active work under G:\\agent组网. Ten runtime experiments pass; current effort is folding the standalone experiments into a usable local prototype. Logged here as in-progress research; will update as it lands.' },
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
      links: [
        { label: 'Source code', href: `${GH}/financial-analyst` },
        { label: 'PyPI', href: 'https://pypi.org/project/financial-analyst/' },
        { label: 'Datasets (HuggingFace)', href: 'https://huggingface.co/yifishbossman' },
        { label: 'Build journey (bilingual)', href: `${GH}/financial-analyst/blob/main/docs/journey.md` },
      ],
      sections: [
        { heading: 'Background', body: 'A-share research is noisy and fragmented; one person can hardly track fundamentals, technicals and capital flows at once. I wanted a system that collaborates like a team — many agents, each with a job — producing a report you can actually audit.' },
        { heading: 'Approach', body: '24 agents across four trust tiers: a data tier (some read untrusted news / filings with JSON-schema-locked output), an analyst tier (fundamental / technical / sentiment / quant), a decision tier (bull, bear, risk officer, report-writer — only the writer can touch files), and a fourth-tier introspector for self-audit. Each agent has pluggable markdown memory with FTS5 retrieval; a "dream" loop self-iterates from past reports and real prices, but always with human review — wrong memory compounds losses in a quant system.' },
        { heading: 'Status', body: 'A stable release on PyPI (v1.0.6) with 712 tests; `fa start` is a zero-config one-command launch (wizard + backend + Web UI + browser auto-opens); 31 buddy tools and 5 swarm presets. Supports four LLM providers (qwen / deepseek / openai / anthropic) with hot-swap; Aliyun Bailian\'s 1M free-token credit covers ~150 reports. Datasets hosted on HuggingFace — demo 155 MB / lite 3 GB / full 14 GB; CN users get 3-10× acceleration via hf-mirror or ModelScope.' },
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
      links: [
        { label: 'Source code', href: `${GH}/oss-scout` },
      ],
      sections: [
        { heading: 'Background', body: 'Every day Trending / Hacker News / Trendshift push hundreds of new repos at you; maybe a handful are actually relevant. I wanted a scout that learns my taste instead of manually star/hide forever.' },
        { heading: 'Approach', body: 'Eight MCP tools on a thin server: `refresh_now` (explicit pull — not hidden inside search), `show_profile / update_profile`, `set_github_user` (optionally pull starred repos as a taste signal), `find_relevant_new` (rank by current profile), `mark_useful / mark_noise` (feedback), `search_archive`. Every piece of feedback bumps profile_version, so scoring adapts immediately. A heuristic scorer is the fallback; once Ollama is upgraded locally a model scorer plugs in. Scouts (Trending / HN / Trendshift) are Protocol-based — easy to swap.' },
        { heading: 'Status', body: 'v0.4 live in Claude Code user scope with all 8 tools shipping. Scorer is heuristic today, model-based once the local model is in place; profile is persisted in SQLite and feedback applies on the spot.' },
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
      links: [],
      sections: [
        { heading: 'Background', body: 'Claude, Codex and other agent hosts all run on the same machine against the same repos, but they each re-crawl the code and re-summarise from scratch. That should be a shared memory: distil what was done into reusable patterns, then let every agent search / get it.' },
        { heading: 'Approach', body: 'Separate mining from synthesis. The miner registers projects, fetches focus files and codesearch hits by topic (rag / mcp-tools / llm-api / agent-runtime …), filters ignored paths, redacts secrets, and writes a bounded evidence pack. An agent only condenses that small pack into a validated markdown card. Cards and evidence live in SQLite + FTS5; the MCP surface is nine tools: `list_projects / search_experience / get_experience / get_evidence_pack / list_candidates / set_candidate_status / upsert_experience_card / mine_experience_candidates / archive_experience`.' },
        { heading: 'Status', body: 'Mined and carded across several real projects: financial-analyst, weekly-agentmemory, memory-share, personalized-repo-mcp, paper-distiller, pde-phase8/10, ceramic-ai-predict, and more. Cards support search / archive; candidates flow through new / carded / rejected states.' },
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
      links: [
        { label: 'Source code', href: `${GH}/paper-distiller` },
        { label: 'PyPI', href: 'https://pypi.org/project/paper-distiller/' },
      ],
      sections: [
        { heading: 'Background', body: 'The slow part of reading papers is truly absorbing one and connecting it to what you have already read. I wanted a conversational assistant: tell it what you want in natural language, let it choose which tool to call, and have it distill papers into a searchable, interlinked knowledge base.' },
        { heading: 'Approach', body: 'Seven LLM-callable tools (search / distill / QA / long research / proof lookup); a local arXiv mirror of ~1.7M papers with SQLite + FTS5 for millisecond search; every paper yields a 12-section deep distillation plus a theorem / technique proof sidecar, so later distillations automatically retrieve related prior theorems — keeping notation and naming coherent across the vault. Output is Obsidian-compatible markdown.' },
        { heading: 'Status', body: 'Published on PyPI (MIT) with 436 tests; supports multiple LLM providers; cost-controlled — a deep distillation runs about ¥0.04 per paper.' },
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
      links: [],
      sections: [
        { heading: 'Background', body: 'The more AI tools I install, the more I want one that lives on my own machine and remembers how I work — instead of installing yet another app, an agent that orchestrates the tools I already run (Claude Code / Codex / MCP servers / various CLIs).' },
        { heading: 'Approach', body: 'A long-running local agent in two flavours, EN and CN — corpora and instruction habits differ enough to be worth two configurations. It handles daily scheduling, research lookups, file organisation, and stringing one-off tools into reusable workflows. New capabilities land first as small MCP tools, then graduate into Jarvis\'s resident skill set if they earn it.' },
        { heading: 'Status', body: 'In daily personal use. This one is more of a personal-OS that keeps evolving — not for distribution, but a lot of the other artefacts (MCP servers, common skills, the agent-mesh ideas) sprout from here.' },
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
