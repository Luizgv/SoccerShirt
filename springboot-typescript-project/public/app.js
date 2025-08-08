// Global variables
let authToken = localStorage.getItem('authToken');
let currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
let currentEditingUserId = null;

// API Base URL
const API_BASE = '/api';

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    console.log('authToken:', authToken);
    console.log('currentUser:', currentUser);
    
    if (authToken && currentUser) {
        showDashboard();
    } else {
        showLogin();
    }
});

// Authentication functions
async function login(email, password) {
    try {
        const response = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            authToken = data.token;
            currentUser = data.user;
            localStorage.setItem('authToken', authToken);
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            showDashboard();
            return { success: true };
        } else {
            return { success: false, error: data.message || 'Erro ao fazer login' };
        }
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, error: 'Erro de conexão' };
    }
}

async function logout() {
    console.log('logout called');
    
    // Confirmar logout
    if (!confirm('Tem certeza que deseja sair do sistema?')) {
        return;
    }
    
    try {
        // Chamar a API de logout
        if (authToken) {
            try {
                await fetch(`${API_BASE}/auth/logout`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`
                    }
                });
            } catch (error) {
                console.error('Erro ao chamar API de logout:', error);
                // Continue com o logout local mesmo se a API falhar
            }
        }
        
        // Limpar dados locais
        authToken = null;
        currentUser = null;
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        
        // Mostrar tela de login
        showLogin();
        
        // Mostrar mensagem de sucesso
        showAlert('loginAlert', 'Logout realizado com sucesso!', 'success');
    } catch (error) {
        console.error('Error in logout:', error);
        // Em caso de erro, ainda assim mostrar tela de login
        showLogin();
    }
}

// Navigation functions
function redirectToProducts() {
    console.log('redirectToProducts called');
    console.log('Current user:', currentUser);
    console.log('Auth token:', authToken);
    showSection('products');
}

function redirectToUsers() {
    console.log('redirectToUsers called');
    console.log('Current user:', currentUser);
    // Verificar se o usuário tem permissão para acessar usuários
    if (currentUser && currentUser.group === 'ADMINISTRADOR') {
        showSection('users');
    } else {
        alert('Acesso negado. Apenas administradores podem acessar a gestão de usuários.');
    }
}

// UI Navigation
function showLogin() {
    console.log('showLogin called');
    try {
        const loginSection = document.getElementById('loginSection');
        const dashboardSection = document.getElementById('dashboardSection');
        
        console.log('Login section found:', !!loginSection);
        console.log('Dashboard section found:', !!dashboardSection);
        
        if (loginSection) loginSection.classList.add('active');
        if (dashboardSection) dashboardSection.classList.remove('active');
    } catch (error) {
        console.error('Error in showLogin:', error);
    }
}

function showDashboard() {
    document.getElementById('loginSection').classList.remove('active');
    document.getElementById('dashboardSection').classList.add('active');
    
    // Update user info
    document.getElementById('userInfo').innerHTML = `
        <strong>Bem-vindo, ${currentUser.name}!</strong><br>
        <span style="color: #666;">Grupo: ${currentUser.group} | Status: ${currentUser.status}</span>
    `;

    // Show/hide users section based on user group
    if (currentUser.group === 'ADMINISTRADOR') {
        document.getElementById('usersNavBtn').style.display = 'block';
    } else {
        document.getElementById('usersNavBtn').style.display = 'none';
    }

    // Load initial data
    loadProducts();
}

function showSection(section, targetButton = null) {
    console.log('showSection called with:', section, targetButton);
    console.log('Event target:', event ? event.target : 'no event');
    
    try {
        // Update navigation
        const navButtons = document.querySelectorAll('.nav-btn');
        console.log('Found nav buttons:', navButtons.length);
        
        navButtons.forEach(btn => btn.classList.remove('active'));
        
        // If targetButton is provided, use it; otherwise try to find the button by section
        if (targetButton) {
            targetButton.classList.add('active');
        } else {
            // Find the button based on the section
            navButtons.forEach(btn => {
                if ((section === 'products' && btn.textContent.includes('Produtos')) ||
                    (section === 'users' && btn.textContent.includes('Usuários'))) {
                    btn.classList.add('active');
                    console.log('Activated button:', btn.textContent);
                }
            });
        }

        // Get section elements
        const productsSection = document.getElementById('productsSection');
        const usersSection = document.getElementById('usersSection');
        
        console.log('Products section found:', !!productsSection);
        console.log('Users section found:', !!usersSection);

        // Show/hide sections
        if (section === 'products') {
            if (productsSection) productsSection.style.display = 'block';
            if (usersSection) usersSection.style.display = 'none';
            console.log('Loading products...');
            loadProducts();
        } else if (section === 'users') {
            if (productsSection) productsSection.style.display = 'none';
            if (usersSection) usersSection.style.display = 'block';
            console.log('Loading users...');
            loadUsers();
        }
    } catch (error) {
        console.error('Error in showSection:', error);
    }
}

// Products functions
async function loadProducts() {
    try {
        const response = await fetch(`${API_BASE}/products`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });

        const data = await response.json();

        if (response.ok) {
            displayProducts(data.products);
        } else {
            showAlert('productsAlert', 'Erro ao carregar produtos', 'danger');
        }
    } catch (error) {
        showAlert('productsAlert', 'Erro de conexão', 'danger');
    }
}

function displayProducts(products) {
    const grid = document.getElementById('productsGrid');
    
    if (products.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: #666;">Nenhum produto encontrado.</p>';
        return;
    }

    grid.innerHTML = products.map(product => `
        <div class="product-card">
            ${product.image ? `<img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.style.display='none'">` : ''}
            <div class="product-name">${product.name}</div>
            <div class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</div>
            <div class="product-stock">Estoque: ${product.stock} unidades</div>
            <div class="product-category">${product.category}</div>
        </div>
    `).join('');
}

// Users functions
async function loadUsers() {
    try {
        const response = await fetch(`${API_BASE}/users`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });

        const data = await response.json();

        if (response.ok) {
            displayUsers(data.users);
            clearAlert('usersAlert');
        } else {
            showAlert('usersAlert', data.message || 'Erro ao carregar usuários', 'danger');
        }
    } catch (error) {
        showAlert('usersAlert', 'Erro de conexão', 'danger');
    }
}

function displayUsers(users) {
    const container = document.getElementById('usersTable');
    
    if (users.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666;">Nenhum usuário encontrado.</p>';
        return;
    }

    container.innerHTML = `
        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>CPF</th>
                    <th>Grupo</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                ${users.map(user => `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.cpf}</td>
                        <td>${user.group}</td>
                        <td><span class="status-${user.status.toLowerCase()}">${user.status}</span></td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn btn-secondary" style="padding: 4px 8px; font-size: 0.8rem;" onclick="editUser(${user.id})">✏️ Editar</button>
                                <button class="btn btn-secondary" style="padding: 4px 8px; font-size: 0.8rem;" onclick="changePassword(${user.id})">🔑 Senha</button>
                                <button class="btn ${user.status === 'ATIVO' ? 'btn-danger' : ''}" style="padding: 4px 8px; font-size: 0.8rem;" onclick="toggleUserStatus(${user.id}, '${user.status === 'ATIVO' ? 'DESATIVADO' : 'ATIVO'}')">
                                    ${user.status === 'ATIVO' ? '❌ Desativar' : '✅ Ativar'}
                                </button>
                            </div>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// User management functions
function showCreateUserModal() {
    currentEditingUserId = null;
    document.getElementById('modalTitle').textContent = 'Novo Usuário';
    document.getElementById('userForm').reset();
    document.getElementById('passwordGroup').style.display = 'block';
    document.getElementById('userPassword').required = true;
    document.getElementById('userEmail').disabled = false;
    clearAlert('modalAlert');
    document.getElementById('userModal').style.display = 'block';
}

async function editUser(userId) {
    try {
        const response = await fetch(`${API_BASE}/users/${userId}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });

        const data = await response.json();

        if (response.ok) {
            currentEditingUserId = userId;
            document.getElementById('modalTitle').textContent = 'Editar Usuário';
            document.getElementById('userName').value = data.user.name;
            document.getElementById('userEmail').value = data.user.email;
            document.getElementById('userEmail').disabled = true;
            document.getElementById('userCpf').value = data.user.cpf;
            document.getElementById('userGroup').value = data.user.group;
            document.getElementById('passwordGroup').style.display = 'none';
            document.getElementById('userPassword').required = false;
            clearAlert('modalAlert');
            document.getElementById('userModal').style.display = 'block';
        } else {
            showAlert('usersAlert', data.message || 'Erro ao carregar usuário', 'danger');
        }
    } catch (error) {
        showAlert('usersAlert', 'Erro de conexão', 'danger');
    }
}

function closeUserModal() {
    document.getElementById('userModal').style.display = 'none';
    currentEditingUserId = null;
}

function changePassword(userId) {
    currentEditingUserId = userId;
    document.getElementById('passwordForm').reset();
    clearAlert('passwordAlert');
    document.getElementById('passwordModal').style.display = 'block';
}

function closePasswordModal() {
    document.getElementById('passwordModal').style.display = 'none';
    currentEditingUserId = null;
}

async function toggleUserStatus(userId, newStatus) {
    const action = newStatus === 'ATIVO' ? 'ativar' : 'desativar';
    
    if (!confirm(`Tem certeza que deseja ${action} este usuário?`)) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/users/${userId}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ status: newStatus })
        });

        const data = await response.json();

        if (response.ok) {
            showAlert('usersAlert', data.message, 'success');
            loadUsers();
        } else {
            showAlert('usersAlert', data.message || 'Erro ao alterar status', 'danger');
        }
    } catch (error) {
        showAlert('usersAlert', 'Erro de conexão', 'danger');
    }
}

// Form handlers
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const result = await login(email, password);
    
    if (result.success) {
        clearAlert('loginAlert');
    } else {
        showAlert('loginAlert', result.error, 'danger');
    }
});

document.getElementById('userForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());

    try {
        let response;
        
        if (currentEditingUserId) {
            // Update user
            const { password, ...updateData } = userData;
            response = await fetch(`${API_BASE}/users/${currentEditingUserId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify(updateData)
            });
        } else {
            // Create user
            response = await fetch(`${API_BASE}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify(userData)
            });
        }

        const data = await response.json();

        if (response.ok) {
            showAlert('usersAlert', data.message, 'success');
            closeUserModal();
            loadUsers();
        } else {
            showAlert('modalAlert', data.message || 'Erro ao salvar usuário', 'danger');
        }
    } catch (error) {
        showAlert('modalAlert', 'Erro de conexão', 'danger');
    }
});

document.getElementById('passwordForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const passwordData = Object.fromEntries(formData.entries());

    try {
        const response = await fetch(`${API_BASE}/users/${currentEditingUserId}/password`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(passwordData)
        });

        const data = await response.json();

        if (response.ok) {
            showAlert('usersAlert', data.message, 'success');
            closePasswordModal();
        } else {
            showAlert('passwordAlert', data.message || 'Erro ao alterar senha', 'danger');
        }
    } catch (error) {
        showAlert('passwordAlert', 'Erro de conexão', 'danger');
    }
});

// Utility functions
function showAlert(containerId, message, type) {
    const container = document.getElementById(containerId);
    container.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
    
    if (type === 'success') {
        setTimeout(() => clearAlert(containerId), 5000);
    }
}

function clearAlert(containerId) {
    document.getElementById(containerId).innerHTML = '';
}

// CPF Mask
document.getElementById('userCpf').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    e.target.value = value;
});

// Close modals when clicking outside
window.onclick = function(event) {
    const userModal = document.getElementById('userModal');
    const passwordModal = document.getElementById('passwordModal');
    
    if (event.target === userModal) {
        userModal.style.display = 'none';
    }
    if (event.target === passwordModal) {
        passwordModal.style.display = 'none';
    }
}

// Make functions available globally (fix for onclick handlers)
window.showSection = showSection;
window.logout = logout;
window.redirectToProducts = redirectToProducts;
window.redirectToUsers = redirectToUsers;
window.showLogin = showLogin;
window.showDashboard = showDashboard;
window.showCreateUserModal = showCreateUserModal;
window.closeUserModal = closeUserModal;
window.closePasswordModal = closePasswordModal;
window.editUser = editUser;
window.changePassword = changePassword;
window.toggleUserStatus = toggleUserStatus;
