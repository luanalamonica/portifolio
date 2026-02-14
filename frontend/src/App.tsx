import { useEffect, useState } from 'react'
import './App.css'

const getCurrentMonthYearPtBr = () => {
  return new Intl.DateTimeFormat('pt-BR', {
    month: 'long',
    year: 'numeric',
    timeZone: 'America/Sao_Paulo',
  })
    .format(new Date())
    .toLowerCase()
}

type GithubRepo = {
  id: number
  name: string
  description: string | null
  html_url: string
  language: string | null
}

type FeaturedProject = {
  id: string
  title: string
  summary: string
  bullets: string[]
  techs: string[]
  imageUrl?: string
  repoUrl: string
  liveUrl?: string
}

type Language = 'pt' | 'en'

const uiText = {
  pt: {
    pageTitle: 'Front-end Developer',
    heroAbout:
      'Me chamo Luana, sou de Bauru (SP) e venho da área de suporte de TI. Hoje atuo como Assistente de TI e estou focada em migrar para o desenvolvimento web, unindo minha base técnica com React, TypeScript e outras tecnologias modernas.',
    experienceSubtitle: 'Um pouco da minha jornada na área de TI.',
    projectsSubtitle: 'Projetos que mostram o que eu gosto de construir.',
    contactSubtitle:
      'Vamos conversar? Me manda uma mensagem e eu retorno assim que possível.',
    contactCta: 'enviar mensagem',
    contactCtaLoading: 'enviando...',
    githubMoreTitle: 'mais projetos no meu GitHub',
    skillsSubtitle: 'Focada em desenvolvimento front-end e tecnologias web.',
  },
  en: {
    pageTitle: 'Front-end Developer',
    heroAbout:
      "I'm Luana, from Bauru (SP). I come from an IT support background and I'm focused on moving into web development, combining this experience with React, TypeScript and other modern front-end tools.",
    experienceSubtitle: 'A bit of my journey in IT.',
    projectsSubtitle: 'Projects that show what I like to build.',
    contactSubtitle:
      "Shall we talk? Send me a message and I'll get back to you as soon as possible.",
    contactCta: 'send message',
    contactCtaLoading: 'sending...',
    githubMoreTitle: 'more projects on my GitHub',
    skillsSubtitle: 'Focused on front-end development and web technologies.',
  },
} satisfies Record<Language, any>

const featuredProjects: FeaturedProject[] = [
  {
    id: 'tiny-swords',
    title: 'Tiny Swords',
    summary:
      'Jogo 2D criado no bootcamp Santander, explorando ação e aventura com Godot.',
    bullets: [
      'Cenários, personagens e inimigos construídos com scenes e sprites no Godot',
      'Lógica de movimento, combate e pontuação implementada em GDScript',
      'Vários níveis com desafios progressivos e tela final de jogo',
    ],
    techs: ['Godot', 'GDScript'],
    imageUrl:
      'https://github.com/luanalamonica/Tiny-Swords/blob/main/terceira%20tela.png?raw=true',
    repoUrl: 'https://github.com/luanalamonica/Tiny-Swords',
  },
  {
    id: 'todo-list',
    title: 'To-Do List',
    summary: 'Aplicação de lista de tarefas com interface amigável e armazenamento local.',
    bullets: [
      'Adicionar, editar, concluir e remover tarefas do dia a dia',
      'Persistência das tarefas usando Local Storage do navegador',
      'Interface construída em React com componentes funcionais e CSS',
    ],
    techs: ['React', 'JavaScript', 'CSS'],
    imageUrl:
      'https://github.com/luanalamonica/To-Do-List/blob/main/Desafio-CoteFacil.gif?raw=true',
    repoUrl: 'https://github.com/luanalamonica/To-Do-List',
  },
  {
    id: 'project-formula1',
    title: 'Projeto Fórmula 1',
    summary:
      'Site e bot do Telegram sobre Fórmula 1, integrando notícias, pilotos e equipes.',
    bullets: [
      'Desenvolvido com Laravel e banco de dados para armazenar informações da F1',
      'Integração com bot do Telegram para consultar notícias, pilotos e equipes',
      'Interface web com telas de login, registro, notícias e placares',
    ],
    techs: ['PHP', 'Laravel', 'MySQL'],
    imageUrl:
      'https://github.com/luanalamonica/Fotos-Projeto-Formula1/blob/main/Projeto%20Formula%201.gif?raw=true',
    repoUrl: 'https://github.com/luanalamonica/project-formula1',
  },
  {
    id: 'nurture-web',
    title: 'Nurture',
    summary: 'Plataforma para conectar Au Pairs e famílias, com fluxo completo de telas.',
    bullets: [
      'Fluxo com login, recuperação de senha e telas iniciais da plataforma',
      'Sugestões de atividades lúdicas para cuidadores e famílias',
      'Interface responsiva usando HTML, CSS, JavaScript e frameworks de UI',
    ],
    techs: ['HTML', 'CSS', 'JavaScript'],
    imageUrl:
      'https://github.com/luanalamonica/Nurture-Web/blob/main/quarta%20tela.png?raw=true',
    repoUrl: 'https://github.com/luanalamonica/Nurture-Web',
  },
]

function App() {
  const [repos, setRepos] = useState<GithubRepo[]>([])
  const [isLoadingRepos, setIsLoadingRepos] = useState(true)
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactMessage, setContactMessage] = useState('')
  const [contactStatus, setContactStatus] = useState<string | null>(null)
  const [isSendingContact, setIsSendingContact] = useState(false)
  const [language, setLanguage] = useState<Language>('pt')

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          'https://api.github.com/users/luanalamonica/repos?sort=updated&per_page=21',
        )
        const data = (await response.json()) as GithubRepo[]
        setRepos(data)
      } catch (error) {
        console.error('Erro ao buscar repositórios do GitHub', error)
      } finally {
        setIsLoadingRepos(false)
      }
    }

    fetchRepos()
  }, [])

  const featuredRepoNames = new Set([
    'Tiny-Swords',
    'To-Do-List',
    'project-formula1',
    'Nurture-Web',
    'Fotos-Projeto-Formula1',
    'luanalamonica',
  ])

  const visibleRepos = repos.filter((repo) => !featuredRepoNames.has(repo.name))

  const handleSubmitContact = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setContactStatus(null)
    setIsSendingContact(true)

    try {
      const response = await fetch('http://localhost:3333/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          message: contactMessage,
        }),
      })

      if (!response.ok) {
        throw new Error('Erro ao enviar mensagem')
      }

      setContactStatus('Mensagem enviada com sucesso!')
      setContactName('')
      setContactEmail('')
      setContactMessage('')
    } catch (error) {
      console.error(error)
      setContactStatus('Não foi possível enviar. Tente novamente mais tarde.')
    } finally {
      setIsSendingContact(false)
    }
  }

  return (
    <div className="page">
      <header className="page-header">
        <div className="page-title-group">
          <span className="page-date">{getCurrentMonthYearPtBr()}</span>
          <h1 className="page-title">{uiText[language].pageTitle}</h1>
          <div className="page-stack">
            <span className="page-stack-label">techs que uso</span>
            <div className="page-stack-chips">
              <span className="page-stack-chip">React</span>
              <span className="page-stack-chip">TypeScript</span>
              <span className="page-stack-chip">JavaScript</span>
              <span className="page-stack-chip">Node.js</span>
              <span className="page-stack-chip">HTML</span>
              <span className="page-stack-chip">CSS</span>
            </div>
          </div>
        </div>
        <div className="page-header-right">
          <span className="page-device">//desktop</span>
          <div className="language-toggle" aria-label="Selecionar idioma">
            <button
              type="button"
              className={`language-toggle-button ${language === 'pt' ? 'active' : ''}`}
              onClick={() => setLanguage('pt')}
            >
              PT
            </button>
            <span className="language-toggle-separator">/</span>
            <button
              type="button"
              className={`language-toggle-button ${language === 'en' ? 'active' : ''}`}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
          </div>
        </div>
      </header>

      <main className="page-main">
        <div className="hero-wrapper">
          <section id="home" className="hero-card">
          <nav className="hero-nav">
            <a href="#home">&lt;home&gt;</a>
            <a href="#experience">&lt;experiences&gt;</a>
            <a href="#projects">&lt;projects&gt;</a>
            <a href="#contact">&lt;contact&gt;</a>
          </nav>

          <div className="hero-top-bar">
            <div className="hero-socials">
              <a
                href="https://github.com/luanalamonica"
                aria-label="GitHub"
                target="_blank"
                rel="noreferrer"
              >
                gh
              </a>
              <a
                href="https://www.linkedin.com/in/luana-lamonica"
                aria-label="LinkedIn"
                target="_blank"
                rel="noreferrer"
              >
                in
              </a>
              <a
                href="https://www.instagram.com/luanalamonica_"
                aria-label="Instagram"
                target="_blank"
                rel="noreferrer"
              >
                ig
              </a>
            </div>
          </div>

          <div className="hero-content">
            <div className="hero-name-block">
              <span className="hero-tag">&lt;developer&gt;</span>
              <h2 className="hero-name">
                Luana
                <br />
                Lamonica
              </h2>
              <span className="hero-tag hero-tag-close">&lt;/developer&gt;</span>
            </div>

            <div className="hero-photo-wrapper">
              <img
                src="/perfil.jpeg"
                alt="Foto de perfil de Luana Lamonica"
                className="hero-photo"
              />
            </div>

            <div className="hero-about-block">
              <span className="hero-tag">&lt;about me&gt;</span>
              <p className="hero-about-text">
                {uiText[language].heroAbout}
              </p>
              <span className="hero-tag hero-tag-close">&lt;/about me&gt;</span>
            </div>
          </div>

          <div className="hero-photo-glow" />
          </section>
        </div>

        <section id="experience" className="section section-experience">
          <div className="section-card">
            <header className="section-header">
              <span className="hero-tag">&lt;experiences&gt;</span>
              <p className="section-subtitle">
                {uiText[language].experienceSubtitle}
              </p>
            </header>

            <div className="experience-list">
              <article className="experience-item">
                <span className="experience-period">fev 2025 — momento · 1 ano 1 mês</span>
                <h3 className="experience-role">Assistente de Suporte TI</h3>
                <p className="experience-company">
                  CART - Concessionária Auto Raposo Tavares · Tempo integral
                </p>
                <p className="experience-description">
                  Suporte técnico a usuários, manutenção de estações de
                  trabalho, atendimento de chamados e acompanhamento de
                  incidentes em ambiente corporativo.
                </p>
              </article>

              <article className="experience-item">
                <span className="experience-period">jul 2024 — fev 2025 · 8 meses</span>
                <h3 className="experience-role">Estagiária de Suporte TI</h3>
                <p className="experience-company">
                  CART - Concessionária Auto Raposo Tavares · Estágio
                </p>
                <p className="experience-description">
                  Atuação com suporte técnico, antivírus Kaspersky e outras
                  ferramentas, apoio na rotina de TI e monitoramento de
                  infraestrutura.
                </p>
              </article>
            </div>

            <div className="skills-and-certs">
              <div className="skills-block">
                <header className="skills-header">
                  <span className="hero-tag">&lt;skills&gt;</span>
                  <p className="section-subtitle">
                    {uiText[language].skillsSubtitle}
                  </p>
                </header>
                <div className="skills-grid">
                  {[
                    {
                      name: 'HTML & CSS',
                      levelPt: 'intermediário',
                      levelEn: 'intermediate',
                    },
                    {
                      name: 'JavaScript',
                      levelPt: 'intermediário',
                      levelEn: 'intermediate',
                    },
                    {
                      name: 'TypeScript',
                      levelPt: 'iniciante',
                      levelEn: 'beginner',
                    },
                    {
                      name: 'React',
                      levelPt: 'iniciante/intermediário',
                      levelEn: 'beginner / intermediate',
                    },
                    {
                      name: 'Git & GitHub',
                      levelPt: 'intermediário',
                      levelEn: 'intermediate',
                    },
                  ].map((skill) => (
                    <div key={skill.name} className="skill-item">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-level">
                        {language === 'pt' ? skill.levelPt : skill.levelEn}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="certs-block">
                <header className="skills-header">
                  <span className="hero-tag">
                    &lt;
                    {language === 'pt'
                      ? 'formações & certificados'
                      : 'education & certificates'}
                    &gt;
                  </span>
                </header>
                <ul className="cert-list">
                  <li className="cert-item">
                    <span className="cert-name">Santander Explorer 2023 - 2ª Edição</span>
                    <span className="cert-meta">Santander X Explorer · dez 2023 · Cybersecurity &amp; AppSec</span>
                    <span className="cert-meta">
                      Projeto TechnoPro em cibersegurança e AppSec, levando a ITE ao 7º lugar entre mais de 100 universidades.
                    </span>
                  </li>
                  <li className="cert-item">
                    <span className="cert-name">Bootcamp Santander 2024 - Criando Jogos com Godot</span>
                    <span className="cert-meta">Santander Universidades · jun 2024 · Godot, GDScript, JavaScript</span>
                    <span className="cert-meta">
                      Desenvolvimento do jogo Tiny Swords e scripts em JavaScript para nível de herói e cálculo de partidas ranqueadas.
                    </span>
                    <span className="cert-meta">
                      Repositórios:
                      {' '}
                      <a
                        href="https://github.com/luanalamonica/Tiny-Swords"
                        className="cert-link"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Tiny Swords
                      </a>
                      ,
                      {' '}
                      <a
                        href="https://github.com/luanalamonica/Nivel-Heroi"
                        className="cert-link"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Nível Herói
                      </a>
                      {' '}
                      e
                      {' '}
                      <a
                        href="https://github.com/luanalamonica/Calculadora-Partidas"
                        className="cert-link"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Calculadora de Partidas
                      </a>
                      .
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="section section-projects">
          <div className="section-card">
            <header className="section-header">
              <span className="hero-tag">&lt;projects&gt;</span>
              <p className="section-subtitle">
                {uiText[language].projectsSubtitle}
              </p>
            </header>
            <div className="featured-projects">
              {featuredProjects.map((project, index) => (
                <article
                  key={project.id}
                  className={`featured-card ${index === 0 ? 'featured-main' : ''}`}
                >
                  {project.imageUrl && (
                    <div className="featured-thumb-wrapper">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="featured-thumb"
                      />
                    </div>
                  )}
                  <div className="featured-body">
                    <span className="project-tag">destaque</span>
                    <h3 className="featured-title">{project.title}</h3>
                    <p className="featured-summary">{project.summary}</p>
                    <ul className="featured-bullets">
                      {project.bullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <div className="featured-footer">
                      <div className="featured-techs">
                        {project.techs.map((tech) => (
                          <span key={tech} className="featured-tech-chip">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="featured-links">
                        <a
                          href={project.repoUrl}
                          className="project-link"
                          target="_blank"
                          rel="noreferrer"
                        >
                          ver código
                        </a>
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            className="project-link"
                            target="_blank"
                            rel="noreferrer"
                          >
                            ver deploy
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <h3 className="more-projects-title">
              {uiText[language].githubMoreTitle}
            </h3>

            <div className="projects-grid">
              {isLoadingRepos && (
                <p className="project-message">carregando projetos do GitHub…</p>
              )}

              {!isLoadingRepos && visibleRepos.length === 0 && (
                <p className="project-message">
                  ainda não há projetos públicos no meu GitHub.
                </p>
              )}

              {visibleRepos.map((repo) => {
                const projectTag =
                  repo.name === 'PulseSensor_Amped_Arduino'
                    ? 'C++'
                    : repo.name === 'dio-lab-open-source'
                    ? 'Jupyter Notebook'
                    : repo.language
                    ? repo.language.toLowerCase()
                    : 'projeto'

                return (
                  <article key={repo.id} className="project-card">
                  <span className="project-tag">{projectTag}</span>
                  <h3 className="project-title">{repo.name}</h3>
                  <p className="project-description">
                    {repo.description ||
                      'Projeto em construção, em breve adiciono uma descrição mais detalhada.'}
                  </p>
                  <div className="project-links">
                    <a
                      href={repo.html_url}
                      className="project-link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      ver no github
                    </a>
                  </div>
                </article>
                )
              })}
            </div>
          </div>
        </section>

        <section id="contact" className="section section-contact">
          <div className="section-card">
            <header className="section-header">
              <span className="hero-tag">&lt;contact&gt;</span>
              <p className="section-subtitle">
                {uiText[language].contactSubtitle}
              </p>
            </header>

            <form className="contact-form" onSubmit={handleSubmitContact}>
              <div className="contact-row">
                <div className="contact-field">
                  <label htmlFor="name">nome</label>
                  <input
                    id="name"
                    type="text"
                    value={contactName}
                    onChange={(event) => setContactName(event.target.value)}
                    required
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="email">email</label>
                  <input
                    id="email"
                    type="email"
                    value={contactEmail}
                    onChange={(event) => setContactEmail(event.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="contact-field">
                <label htmlFor="message">mensagem</label>
                <textarea
                  id="message"
                  rows={4}
                  value={contactMessage}
                  onChange={(event) => setContactMessage(event.target.value)}
                  required
                />
              </div>

              <button className="contact-submit" type="submit" disabled={isSendingContact}>
                {isSendingContact
                  ? uiText[language].contactCtaLoading
                  : uiText[language].contactCta}
              </button>

              {contactStatus && (
                <p className="contact-status">{contactStatus}</p>
              )}
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
