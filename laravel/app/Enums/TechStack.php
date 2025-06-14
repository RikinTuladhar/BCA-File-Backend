<?php

namespace App\Enums;

enum TechStack: string
{
    // Frontend
    case HTML = 'HTML';
    case CSS = 'CSS';
    case JavaScript = 'JavaScript';
    case TypeScript = 'TypeScript';
    case React = 'React';
    case NextJS = 'Next.js';
    case VueJS = 'Vue.js';
    case NuxtJS = 'Nuxt.js';
    case Angular = 'Angular';
    case Svelte = 'Svelte';
    case TailwindCSS = 'Tailwind CSS';
    case Bootstrap = 'Bootstrap';

        // Backend
    case PHP = 'PHP';
    case Laravel = 'Laravel';
    case Symfony = 'Symfony';
    case NodeJS = 'Node.js';
    case ExpressJS = 'Express.js';
    case Python = 'Python';
    case Django = 'Django';
    case Flask = 'Flask';
    case FastAPI = 'FastAPI';
    case Ruby = 'Ruby';
    case RubyOnRails = 'Ruby on Rails';
    case Java = 'Java';
    case Spring = 'Spring';
    case CSharp = 'C#';
    case DotNet = '.NET';
    case GoLang = 'Go';
    case Rust = 'Rust';

        // Databases
    case MySQL = 'MySQL';
    case PostgreSQL = 'PostgreSQL';
    case MongoDB = 'MongoDB';
    case SQLite = 'SQLite';
    case Redis = 'Redis';
    case MariaDB = 'MariaDB';
    case Firebase = 'Firebase';
    case Cassandra = 'Cassandra';
    case Neo4j = 'Neo4j';

        // DevOps & Cloud
    case Docker = 'Docker';
    case Kubernetes = 'Kubernetes';
    case AWS = 'AWS';
    case Azure = 'Azure';
    case GoogleCloud = 'Google Cloud Platform';
    case Vercel = 'Vercel';
    case Netlify = 'Netlify';
    case Heroku = 'Heroku';

        // Testing
    case Jest = 'Jest';
    case Mocha = 'Mocha';
    case Jasmine = 'Jasmine';
    case Cypress = 'Cypress';
    case Selenium = 'Selenium';
    case PHPUnit = 'PHPUnit';
    case PyTest = 'PyTest';

        // Mobile
    case ReactNative = 'React Native';
    case Flutter = 'Flutter';
    case Kotlin = 'Kotlin';
    case Swift = 'Swift';

        // Other Languages
    case C = 'C';
    case CPP = 'C++';
    case R = 'R';
    case Scala = 'Scala';

        // Tools & Misc
    case Git = 'Git';
    case GitHub = 'GitHub';
    case GitLab = 'GitLab';
    case Webpack = 'Webpack';
    case Vite = 'Vite';
    case Babel = 'Babel';
    case ESLint = 'ESLint';
    case Prettier = 'Prettier';
}
