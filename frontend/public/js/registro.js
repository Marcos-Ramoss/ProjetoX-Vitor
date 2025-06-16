document.addEventListener('DOMContentLoaded', function() {
    const companyFields = document.getElementById('companyFields');
    const userTypeRadios = document.getElementsByName('userType');
    const cnpjInput = document.getElementById('cnpj');
    const form = document.getElementById('registerForm');

    // Função para mostrar/ocultar campos de empresa
    function toggleCompanyFields() {
        const isCompany = document.getElementById('userTypeCompany').checked;
        companyFields.style.display = isCompany ? 'block' : 'none';
        cnpjInput.required = isCompany;
    }

    // Adicionar listener para os radio buttons
    userTypeRadios.forEach(radio => {
        radio.addEventListener('change', toggleCompanyFields);
    });

    // Configurar validação e submissão do formulário
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const isCompany = document.getElementById('userTypeCompany').checked;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (isCompany && !cnpjInput.value) {
            showAlert('CNPJ Obrigatório', 'Por favor, preencha o CNPJ da empresa', 'warning');
            cnpjInput.focus();
            return;
        }

        if (password !== confirmPassword) {
            showAlert('Senhas Diferentes', 'As senhas digitadas não coincidem', 'error');
            document.getElementById('confirmPassword').focus();
            return;
        }

        // Mostrar loader
        showLoader();
        
        try {
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Remover campos vazios do endereço para empresa
            if (isCompany) {
                const address = {};
                ['street', 'number', 'city', 'state', 'zipCode'].forEach(field => {
                    const value = formData.get(`address[${field}]`);
                    if (value) address[field] = value;
                });
                if (Object.keys(address).length > 0) {
                    data.address = address;
                }
            }

            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();
            
            if (response.ok) {
                showAlert('Sucesso!', 'Cadastro realizado com sucesso', 'success');
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            } else {
                showAlert('Erro no Cadastro', responseData.message || 'Erro ao realizar cadastro', 'error');
            }
        } catch (error) {
            console.error('Erro:', error);
            showAlert('Erro no Sistema', 'Erro ao processar o cadastro', 'error');
        } finally {
            hideLoader();
        }
    });

    // Inicializar estado dos campos
    toggleCompanyFields();
});