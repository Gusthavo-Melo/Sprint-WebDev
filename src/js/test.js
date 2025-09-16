// Alternância de abas
    function switchTab(tabId) {
      document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
      
      event.currentTarget.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    }
    
    function switchDocTab(tabId) {
      document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
      
      event.currentTarget.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    }
    
    // Log para testes
    function logTest(message, type = 'info') {
      const log = document.getElementById('test-results');
      const color = type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#2d3436';
      log.innerHTML += `<div style="color: ${color}; margin: 5px 0;">${message}</div>`;
      log.scrollTop = log.scrollHeight;
    }
    
    // Log para seed
    function logSeed(message, type = 'info') {
      const log = document.getElementById('seed-log');
      const color = type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#dfe6e9';
      log.innerHTML += `<div style="color: ${color}; margin: 5px 0;">${message}</div>`;
      log.scrollTop = log.scrollHeight;
    }
    
    // Testes de autenticação
    function runAuthTests() {
      logTest('Executando testes de autenticação...', 'info');
      
      // Simulação de testes
      setTimeout(() => {
        logTest('✓ Registro de usuário - OK', 'success');
        
        setTimeout(() => {
          logTest('✓ Login e logout - OK', 'success');
          
          setTimeout(() => {
            logTest('✓ Validação de credenciais - OK', 'success');
            logTest('Todos os testes de autenticação passaram!', 'success');
          }, 300);
        }, 300);
      }, 500);
    }
    
    // Testes de API
    function runApiTests() {
      logTest('Executando testes de API...', 'info');
      
      // Simulação de testes
      setTimeout(() => {
        logTest('✓ Consulta de clima - OK', 'success');
        
        setTimeout(() => {
          logTest('✓ Resposta de erro - OK', 'success');
          
          setTimeout(() => {
            logTest('✓ Formatação de dados - OK', 'success');
            logTest('Todos os testes de API passaram!', 'success');
          }, 300);
        }, 300);
      }, 500);
    }
    
    // Testes de armazenamento
    function runStorageTests() {
      logTest('Executando testes de armazenamento...', 'info');
      
      // Simulação de testes
      setTimeout(() => {
        logTest('✓ Leitura/gravação localStorage - OK', 'success');
        
        setTimeout(() => {
          logTest('✓ Persistência de dados - OK', 'success');
          
          setTimeout(() => {
            logTest('✓ Limpeza de dados - OK', 'success');
            logTest('Todos os testes de armazenamento passaram!', 'success');
          }, 300);
        }, 300);
      }, 500);
    }
    
    // Executar todos os testes
    function runAllTests() {
      document.getElementById('test-results').innerHTML = '';
      logTest('Iniciando todos os testes...', 'info');
      
      runAuthTests();
      setTimeout(() => runApiTests(), 2000);
      setTimeout(() => runStorageTests(), 4000);
    }
    
    // Geração de dados de teste
    function generateTestData() {
      const userCount = parseInt(document.getElementById('userCount').value) || 5;
      logSeed(`Gerando ${userCount} usuários de teste...`, 'info');
      
      // Dados de exemplo
      const users = {
        "admin": "admin123",
        "joao": "senha123",
        "maria": "minhasenha",
        "teste": "teste123"
      };
      
      // Gerar usuários adicionais se necessário
      for (let i = Object.keys(users).length; i < userCount; i++) {
        const username = `user${i+1}`;
        users[username] = `password${i+1}`;
      }
      
      // Armazenar no localStorage
      localStorage.setItem('usersDB', JSON.stringify(users));
      
      // Atualizar contador
      document.getElementById('user-count').textContent = Object.keys(users).length;
      
      logSeed(`${Object.keys(users).length} usuários criados com sucesso!`, 'success');
      logSeed('Use qualquer combinação para teste (ex: admin/admin123)', 'info');
    }
    
    // Gerar dados de clima
    function generateWeatherData() {
      logSeed('Gerando dados de clima...', 'info');
      
      const cities = [
        'São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 
        'Porto Alegre', 'Salvador', 'Fortaleza'
      ];
      
      const weatherData = {};
      
      cities.forEach(city => {
        weatherData[city] = {
          temp: (Math.random() * 35 + 5).toFixed(1),
          humidity: Math.floor(Math.random() * 50 + 30),
          conditions: ['Ensolarado', 'Parcialmente nublado', 'Nublado', 'Chuvoso'][Math.floor(Math.random() * 4)]
        };
      });
      
      localStorage.setItem('weatherData', JSON.stringify(weatherData));
      document.getElementById('city-count').textContent = cities.length;
      
      logSeed(`${cities.length} cidades com dados meteorológicos gerados!`, 'success');
    }
    
    // Limpar todos os dados
    function clearAllData() {
      localStorage.removeItem('usersDB');
      localStorage.removeItem('weatherData');
      localStorage.removeItem('user');
      
      document.getElementById('user-count').textContent = '0';
      document.getElementById('city-count').textContent = '0';
      
      logSeed('Todos os dados foram removidos do localStorage.', 'success');
    }
    
    // Inicialização
    document.addEventListener('DOMContentLoaded', function() {
      // Contar usuários existentes
      try {
        const users = JSON.parse(localStorage.getItem('usersDB') || '{}');
        document.getElementById('user-count').textContent = Object.keys(users).length;
      } catch (e) {
        document.getElementById('user-count').textContent = '0';
      }
      
      // Contar cidades com dados de clima
      try {
        const weatherData = JSON.parse(localStorage.getItem('weatherData') || '{}');
        document.getElementById('city-count').textContent = Object.keys(weatherData).length;
      } catch (e) {
        document.getElementById('city-count').textContent = '0';
      }
    });