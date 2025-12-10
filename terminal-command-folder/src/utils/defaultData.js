// Default categories and commands
const getDefaultData = () => {
  return {
    categories: [
      {
        id: 'category_docker',
        name: 'Docker',
        createdAt: new Date().toISOString()
      },
      {
        id: 'category_git',
        name: 'Git',
        createdAt: new Date().toISOString()
      },
      {
        id: 'category_nginx',
        name: 'Nginx',
        createdAt: new Date().toISOString()
      },
      {
        id: 'category_k8s',
        name: 'Kubernetes',
        createdAt: new Date().toISOString()
      },
      {
        id: 'category_linux',
        name: 'Linux',
        createdAt: new Date().toISOString()
      },
      {
        id: 'category_mysql',
        name: 'MySQL',
        createdAt: new Date().toISOString()
      }
    ],
    commands: [
      // Docker commands
      {
        id: 'command_docker_1',
        text: 'docker ps',
        description: 'List running containers',
        categoryId: 'category_docker',
        createdAt: new Date().toISOString()
      },
      {
        id: 'command_docker_2',
        text: 'docker ps -a',
        description: 'List all containers (including stopped)',
        categoryId: 'category_docker',
        createdAt: new Date().toISOString()
      },
      {
        id: 'command_docker_3',
        text: 'docker images',
        description: 'List all Docker images',
        categoryId: 'category_docker',
        createdAt: new Date().toISOString()
      },
      {
        id: 'command_docker_4',
        text: 'docker run -it --rm ubuntu:latest',
        description: 'Run an interactive Ubuntu container',
        categoryId: 'category_docker',
        createdAt: new Date().toISOString()
      },
      {
        id: 'command_docker_5',
        text: 'docker-compose up -d',
        description: 'Start services defined in docker-compose.yml',
        categoryId: 'category_docker',
        createdAt: new Date().toISOString()
      },

      // Git commands
      {
        id: 'command_git_1',
        text: 'git status',
        description: 'Check git repository status',
        categoryId: 'category_git',
        createdAt: new Date().toISOString()
      },
      {
        id: 'command_git_2',
        text: 'git log --oneline',
        description: 'Show commit history in a compact format',
        categoryId: 'category_git',
        createdAt: new Date().toISOString()
      },
      {
        id: 'command_git_3',
        text: 'git add .',
        description: 'Stage all changes for commit',
        categoryId: 'category_git',
        createdAt: new Date().toISOString()
      },
      {
        id: 'command_git_4',
        text: 'git commit -m "Commit message"',
        description: 'Commit staged changes with a message',
        categoryId: 'category_git',
        createdAt: new Date().toISOString()
      },
      {
        id: 'command_git_5',
        text: 'git pull origin main',
        description: 'Pull latest changes from main branch',
        categoryId: 'category_git',
        createdAt: new Date().toISOString()
      },
      {
        id: 'command_git_6',
        text: 'git push origin feature-branch',
        description: 'Push changes to a feature branch',
        categoryId: 'category_git',
        createdAt: new Date().toISOString()
      },

      // Nginx commands
      {
        id: 'command_nginx_1',
        text: 'sudo systemctl start nginx',
        description: 'Start Nginx service',
        categoryId: 'category_nginx',
        createdAt: new Date().toISOString()
      },
      {
        id: 'command_nginx_2',
        text: 'sudo systemctl stop nginx',
        description: 'Stop Nginx service',
        categoryId: 'category_nginx',
        createdAt: new Date().toISOString()
      },
      {
        id: 'command_nginx_3',
        text: 'sudo systemctl restart nginx',
        description: 'Restart Nginx service',
        categoryId: 'category_nginx',
        createdAt: new Date().toISOString()
      },
      {
        id: 'command_nginx_4',
        text: 'sudo systemctl reload nginx',
        description: 'Reload Nginx configuration without restarting',
        categoryId: 'category_nginx',
        createdAt: new Date().toISOString()
      },
      {
        id: 'command_nginx_5',
        text: 'sudo nginx -t',
        description: 'Test Nginx configuration for syntax errors',
        categoryId: 'category_nginx',
        createdAt: new Date().toISOString()
      },

      // Kubernetes commands
      {
        id: 'command_k8s_1',
        text: 'kubectl get pods',
        description: 'List all pods in the current namespace',
        categoryId: 'category_k8s',
        createdAt: new Date().toISOString()
      },
      {
        id: 'command_k8s_2',
        text: 'kubectl get pods -A',
        description: 'List all pods in all namespaces',
        categoryId: 'category_k8s',
        createdAt: new Date().toISOString()
      },
      {
        id: 'command_k8s_3',
        text: 'kubectl get deployments',
        description: 'List all deployments',
        categoryId: 'category_k8s',
        createdAt: new Date().toISOString()
      },
      {
        id: 'command_k8s_4',
        text: 'kubectl get services',
        description: 'List all services',
        categoryId: 'category_k8s',
        createdAt: new Date().toISOString()
      },
      {
        id: 'command_k8s_5',
        text: 'kubectl describe pod <pod-name>',
        description: 'Show detailed information about a pod',
        categoryId: 'category_k8s',
        createdAt: new Date().toISOString()
      },
      {
        id: 'command_k8s_6',
        text: 'kubectl logs <pod-name>',
        description: 'Show logs from a pod',
        categoryId: 'category_k8s',
        createdAt: new Date().toISOString()
      },

      // Linux commands
      {
        id: 'command_linux_1',
        text: 'ls -la',
        description: 'List all files and directories (including hidden)',
        categoryId: 'category_linux',
        createdAt: new Date().toISOString()
      },
      {
        id: 'command_linux_2',
        text: 'cd <directory>',
        description: 'Change current directory',
        categoryId: 'category_linux',
        createdAt: new Date().toISOString()
      },
      {
        id: 'command_linux_3',
        text: 'pwd',
        description: 'Print current working directory',
        categoryId: 'category_linux',
        createdAt: new Date().toISOString()
      },
      {
        id: 'command_linux_4',
        text: 'grep -r "search-term" <directory>',
        description: 'Search for a term recursively in a directory',
        categoryId: 'category_linux',
        createdAt: new Date().toISOString()
      },
      {
        id: 'command_linux_5',
        text: 'ps aux',
        description: 'List all running processes',
        categoryId: 'category_linux',
        createdAt: new Date().toISOString()
      },
      {
        id: 'command_linux_6',
        text: 'top',
        description: 'Display real-time system resource usage',
        categoryId: 'category_linux',
        createdAt: new Date().toISOString()
      },

      // MySQL commands
      {
        id: 'command_mysql_1',
        text: 'mysql -u <username> -p',
        description: 'Connect to MySQL server',
        categoryId: 'category_mysql',
        createdAt: new Date().toISOString()
      },
      {
        id: 'command_mysql_2',
        text: 'show databases;',
        description: 'List all databases',
        categoryId: 'category_mysql',
        createdAt: new Date().toISOString()
      },
      {
        id: 'command_mysql_3',
        text: 'use <database>;',
        description: 'Select a database to use',
        categoryId: 'category_mysql',
        createdAt: new Date().toISOString()
      },
      {
        id: 'command_mysql_4',
        text: 'show tables;',
        description: 'List all tables in current database',
        categoryId: 'category_mysql',
        createdAt: new Date().toISOString()
      },
      {
        id: 'command_mysql_5',
        text: 'select * from <table>;',
        description: 'Select all records from a table',
        categoryId: 'category_mysql',
        createdAt: new Date().toISOString()
      },
      {
        id: 'command_mysql_6',
        text: 'mysqldump -u <username> -p <database> > backup.sql',
        description: 'Backup a database to SQL file',
        categoryId: 'category_mysql',
        createdAt: new Date().toISOString()
      }
    ]
  };
};

module.exports = {
  getDefaultData
};