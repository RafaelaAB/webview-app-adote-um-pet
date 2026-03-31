import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CadastrarPage from '@/app/cadastrar/page'

const mockBack = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter: () => ({ back: mockBack }),
}))

jest.mock('next/link', () => {
  return function MockLink({ href, children, 'data-testid': testId }: {
    href: string; children: React.ReactNode; 'data-testid'?: string
  }) {
    return <a href={href} data-testid={testId}>{children}</a>
  }
})

/** Preenche todos os campos do formulário com dados válidos */
async function fillForm() {
  await userEvent.type(screen.getByTestId('register-input-name'), 'Bolota')
  await userEvent.selectOptions(screen.getByTestId('register-select-category'), 'Cachorro')
  await userEvent.type(screen.getByTestId('register-input-breed'), 'Vira-lata')
  await userEvent.type(screen.getByTestId('register-input-age'), '1 ano')
  await userEvent.selectOptions(screen.getByTestId('register-select-gender'), 'Macho')
  await userEvent.selectOptions(screen.getByTestId('register-select-size'), 'Médio')
  await userEvent.type(screen.getByTestId('register-input-location'), 'São Paulo, SP')
  await userEvent.type(screen.getByTestId('register-input-description'), 'Um cachorrinho muito fofo.')
  await userEvent.type(screen.getByTestId('register-input-contactName'), 'Maria Silva')
  await userEvent.type(screen.getByTestId('register-input-contactPhone'), '(11) 99999-9999')
}

describe('CadastrarPage', () => {
  beforeEach(() => {
    mockBack.mockClear()
    render(<CadastrarPage />)
  })

  // ── Estrutura ─────────────────────────────────────────────────────────────

  it('exibe o título "Cadastrar um pet"', () => {
    expect(screen.getByTestId('register-title')).toHaveTextContent('Cadastrar um pet')
  })

  it('exibe o subtítulo', () => {
    expect(screen.getByTestId('register-subtitle')).toBeInTheDocument()
  })

  it('renderiza o formulário', () => {
    expect(screen.getByTestId('register-form')).toBeInTheDocument()
  })

  it('exibe o botão Voltar', () => {
    expect(screen.getByTestId('register-btn-back')).toBeInTheDocument()
  })

  it('chama router.back() ao clicar em Voltar', () => {
    fireEvent.click(screen.getByTestId('register-btn-back'))
    expect(mockBack).toHaveBeenCalledTimes(1)
  })

  it('chama router.back() ao clicar em Cancelar', () => {
    fireEvent.click(screen.getByTestId('register-btn-cancel'))
    expect(mockBack).toHaveBeenCalledTimes(1)
  })

  // ── Campos do formulário ──────────────────────────────────────────────────

  it('renderiza todos os campos de texto', () => {
    expect(screen.getByTestId('register-input-name')).toBeInTheDocument()
    expect(screen.getByTestId('register-input-breed')).toBeInTheDocument()
    expect(screen.getByTestId('register-input-age')).toBeInTheDocument()
    expect(screen.getByTestId('register-input-location')).toBeInTheDocument()
    expect(screen.getByTestId('register-input-description')).toBeInTheDocument()
    expect(screen.getByTestId('register-input-contactName')).toBeInTheDocument()
    expect(screen.getByTestId('register-input-contactPhone')).toBeInTheDocument()
  })

  it('renderiza todos os selects', () => {
    expect(screen.getByTestId('register-select-category')).toBeInTheDocument()
    expect(screen.getByTestId('register-select-gender')).toBeInTheDocument()
    expect(screen.getByTestId('register-select-size')).toBeInTheDocument()
  })

  it('o select de categoria tem as opções corretas', () => {
    const select = screen.getByTestId('register-select-category')
    expect(select).toContainElement(screen.getByRole('option', { name: 'Cachorro' }))
    expect(select).toContainElement(screen.getByRole('option', { name: 'Gato' }))
    expect(select).toContainElement(screen.getByRole('option', { name: 'Ave' }))
    expect(select).toContainElement(screen.getByRole('option', { name: 'Coelho' }))
    expect(select).toContainElement(screen.getByRole('option', { name: 'Outro' }))
  })

  // ── Validação ─────────────────────────────────────────────────────────────

  it('exibe erros ao submeter formulário vazio', async () => {
    fireEvent.click(screen.getByTestId('register-btn-submit'))
    await waitFor(() => {
      expect(screen.getByTestId('register-error-name')).toHaveTextContent('Nome é obrigatório')
      expect(screen.getByTestId('register-error-category')).toHaveTextContent('Categoria é obrigatória')
      expect(screen.getByTestId('register-error-breed')).toHaveTextContent('Raça é obrigatória')
      expect(screen.getByTestId('register-error-age')).toHaveTextContent('Idade é obrigatória')
      expect(screen.getByTestId('register-error-gender')).toHaveTextContent('Sexo é obrigatório')
      expect(screen.getByTestId('register-error-size')).toHaveTextContent('Porte é obrigatório')
      expect(screen.getByTestId('register-error-location')).toHaveTextContent('Localização é obrigatória')
      expect(screen.getByTestId('register-error-description')).toHaveTextContent('Descrição é obrigatória')
      expect(screen.getByTestId('register-error-contactName')).toHaveTextContent('Nome do responsável é obrigatório')
      expect(screen.getByTestId('register-error-contactPhone')).toHaveTextContent('Telefone é obrigatório')
    })
  })

  it('remove o erro do campo ao começar a digitar', async () => {
    fireEvent.click(screen.getByTestId('register-btn-submit'))
    await waitFor(() => {
      expect(screen.getByTestId('register-error-name')).toBeInTheDocument()
    })
    await userEvent.type(screen.getByTestId('register-input-name'), 'Rex')
    await waitFor(() => {
      expect(screen.queryByTestId('register-error-name')).not.toBeInTheDocument()
    })
  })

  it('remove o erro do select ao selecionar uma opção', async () => {
    fireEvent.click(screen.getByTestId('register-btn-submit'))
    await waitFor(() => {
      expect(screen.getByTestId('register-error-category')).toBeInTheDocument()
    })
    await userEvent.selectOptions(screen.getByTestId('register-select-category'), 'Gato')
    await waitFor(() => {
      expect(screen.queryByTestId('register-error-category')).not.toBeInTheDocument()
    })
  })

  // ── Envio com sucesso ─────────────────────────────────────────────────────

  it('exibe tela de sucesso ao preencher e submeter corretamente', async () => {
    await fillForm()
    fireEvent.click(screen.getByTestId('register-btn-submit'))
    await waitFor(() => {
      expect(screen.getByTestId('register-success')).toBeInTheDocument()
    })
    expect(screen.getByTestId('register-success-title')).toHaveTextContent('Pet cadastrado com sucesso!')
  })

  it('botão "Voltar ao início" aponta para /', async () => {
    await fillForm()
    fireEvent.click(screen.getByTestId('register-btn-submit'))
    await waitFor(() => {
      expect(screen.getByTestId('register-btn-back-home')).toHaveAttribute('href', '/')
    })
  })

  // ── Acessibilidade ────────────────────────────────────────────────────────

  it('campos obrigatórios têm atributo required', () => {
    expect(screen.getByTestId('register-input-name')).toBeRequired()
    expect(screen.getByTestId('register-input-breed')).toBeRequired()
    expect(screen.getByTestId('register-input-location')).toBeRequired()
  })

  it('campos com erro recebem aria-describedby apontando para a mensagem de erro', async () => {
    fireEvent.click(screen.getByTestId('register-btn-submit'))
    await waitFor(() => {
      expect(screen.getByTestId('register-error-name')).toBeInTheDocument()
    })
    const nameInput = screen.getByTestId('register-input-name')
    expect(nameInput).toHaveAttribute('aria-describedby', 'name-error')
    const nameError = screen.getByTestId('register-error-name')
    expect(nameError).toHaveAttribute('id', 'name-error')
  })

  it('mensagens de erro têm role="alert"', async () => {
    fireEvent.click(screen.getByTestId('register-btn-submit'))
    await waitFor(() => {
      expect(screen.getByTestId('register-error-name')).toBeInTheDocument()
    })
    const alerts = screen.getAllByRole('alert')
    expect(alerts.length).toBeGreaterThan(0)
  })

  it('labels estão associados aos campos via htmlFor', () => {
    const nameInput = screen.getByTestId('register-input-name')
    expect(nameInput).toHaveAttribute('id', 'name')
    expect(screen.getByLabelText(/Nome do pet/i)).toBe(nameInput)
  })

  it('"Cadastrar outro pet" reseta o formulário e volta ao formulário', async () => {
    await fillForm()
    fireEvent.click(screen.getByTestId('register-btn-submit'))
    await waitFor(() => {
      expect(screen.getByTestId('register-success')).toBeInTheDocument()
    })
    fireEvent.click(screen.getByTestId('register-btn-new'))
    await waitFor(() => {
      expect(screen.getByTestId('register-form')).toBeInTheDocument()
    })
    expect(screen.getByTestId('register-input-name')).toHaveValue('')
  })
})
