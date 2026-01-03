import React, { useState } from "react";
import { ArrowLeft, Lock, CheckCircle, Copy } from "lucide-react";

export const PaymentPage = ({ onNavigate, planData }) => {
  const [formData, setFormData] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Brasil",
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card"); // "card" ou "pix"
  const [pixKeyCopied, setPixKeyCopied] = useState(false);
  const [accessKey, setAccessKey] = useState(null);
  const [accessKeyCopied, setAccessKeyCopied] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Formatar número do cartão (XXXX XXXX XXXX XXXX)
    if (name === "cardNumber") {
      formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim();
    }

    // Formatar data de validade (MM/YY)
    if (name === "expiryDate") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .slice(0, 5);
    }

    // Limitar CVV a 4 dígitos
    if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 4);
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.cardholderName.trim()) {
      newErrors.cardholderName = "Nome do titular é obrigatório";
    }

    const cardDigits = formData.cardNumber.replace(/\s/g, "");
    if (!cardDigits || cardDigits.length !== 16) {
      newErrors.cardNumber = "Número do cartão deve ter 16 dígitos";
    }

    if (!formData.expiryDate || formData.expiryDate.length !== 5) {
      newErrors.expiryDate = "Data de validade no formato MM/YY";
    }

    if (!formData.cvv || formData.cvv.length < 3) {
      newErrors.cvv = "CVV deve ter 3 ou 4 dígitos";
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email válido é obrigatório";
    }

    if (!formData.street.trim()) {
      newErrors.street = "Endereço é obrigatório";
    }

    if (!formData.city.trim()) {
      newErrors.city = "Cidade é obrigatória";
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "CEP é obrigatório";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (paymentMethod === "card" && !validateForm()) {
      return;
    }

    // Validar email para PIX
    if (paymentMethod === "pix") {
      const newErrors = {};
      if (
        !formData.email ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      ) {
        newErrors.email = "Email válido é obrigatório";
      }
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      setErrors({});
    }

    setIsProcessing(true);

    // Simular processamento de pagamento
    setTimeout(() => {
      setIsProcessing(false);

      // Gerar chave de acesso apenas para PIX
      if (paymentMethod === "pix") {
        setAccessKey(generateAccessKey());
      }

      setPaymentSuccess(true);
    }, 2000);
  };

  const handleCopyPixKey = () => {
    const pixKey =
      "00020126580014br.gov.bcb.brcode01051.0.063047B48B1D28DA28B0F3D8DDB8ECC400530398265407681.005802BR5913CLOUDMAX6009SAO PAULO62410503***63047B48";
    navigator.clipboard.writeText(pixKey);
    setPixKeyCopied(true);
    setTimeout(() => setPixKeyCopied(false), 2000);
  };

  const generateAccessKey = () => {
    // Gerar chave baseada no plano e ciclo
    const planPrefix = planData?.name?.slice(0, 3).toUpperCase() || "STR";
    const cycleDays = {
      monthly: 30,
      bimonthly: 60,
      quarterly: 90,
      semiannual: 180,
      annual: 365,
    };

    // Extrair ciclo a partir dos dados (precisamos passar isso melhor, por enquanto usamos 30)
    const days = cycleDays["monthly"] || 30;

    // Gerar código único
    const uniqueCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    return `LIBERA${days}DIAS`;
  };

  const handleCopyAccessKey = () => {
    if (accessKey) {
      navigator.clipboard.writeText(accessKey);
      setAccessKeyCopied(true);
      setTimeout(() => setAccessKeyCopied(false), 2000);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="text-center max-w-lg">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Pagamento Aprovado!
          </h2>
          <p className="text-green-600 font-semibold mb-8">
            Seu acesso foi gerado com sucesso.
          </p>

          {/* Seção de Produto Adquirido */}
          <div className="bg-white rounded-2xl shadow-lg border border-green-200 p-8 mb-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">
              Produto Adquirido
            </h3>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 mb-6 border border-indigo-200">
              <div className="text-3xl font-bold text-indigo-600 mb-2">
                {planData?.name}
              </div>
              <div className="text-slate-600">{planData?.size}</div>
              <div className="text-sm text-slate-500 mt-2">Licença 30 Dias</div>
            </div>

            {/* Chave de Acesso */}
            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-3">
                Sua Chave de Acesso
              </h4>
              <div className="bg-slate-900 text-white rounded-lg p-4 mb-4 font-mono text-lg font-bold tracking-wider">
                {accessKey}
              </div>
              <button
                onClick={handleCopyAccessKey}
                className={`w-full px-6 py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 ${
                  accessKeyCopied
                    ? "bg-green-600 text-white"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                <Copy size={18} />
                {accessKeyCopied ? "Chave Copiada!" : "Copiar e Ativar Agora"}
              </button>
            </div>
          </div>

          {/* Informações Adicionais */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-blue-800">
              ℹ️ Sua chave foi enviada para o seu email. Você pode usar a chave
              acima para ativar seu acesso.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => onNavigate("home")}
              className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition"
            >
              Voltar para Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Botão Voltar */}
        <button
          onClick={() => onNavigate("pricing")}
          className="flex items-center gap-2 text-indigo-600 font-medium mb-8 hover:text-indigo-700"
        >
          <ArrowLeft size={20} /> Voltar
        </button>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Formulário de Pagamento */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Informações de Pagamento
              </h2>

              {/* Seletor de Forma de Pagamento */}
              <div className="flex gap-4 mb-8 border-b border-slate-200 pb-6">
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`px-6 py-3 rounded-lg font-bold transition ${
                    paymentMethod === "card"
                      ? "bg-indigo-600 text-white shadow-lg"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                  disabled={isProcessing}
                >
                  💳 Cartão de Crédito
                </button>
                <button
                  onClick={() => setPaymentMethod("pix")}
                  className={`px-6 py-3 rounded-lg font-bold transition ${
                    paymentMethod === "pix"
                      ? "bg-indigo-600 text-white shadow-lg"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                  disabled={isProcessing}
                >
                  🔐 PIX
                </button>
              </div>

              {/* Formulário de Cartão */}
              {paymentMethod === "card" && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Seção: Informações Pessoais */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
                      Dados Pessoais
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="seu@email.com"
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition ${
                            errors.email
                              ? "border-red-500 focus:ring-red-500"
                              : "border-slate-300 focus:ring-indigo-500"
                          }`}
                          disabled={isProcessing}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Seção: Dados do Cartão */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <Lock size={20} className="text-green-600" />
                      Dados do Cartão
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Nome do Titular
                        </label>
                        <input
                          type="text"
                          name="cardholderName"
                          value={formData.cardholderName}
                          onChange={handleInputChange}
                          placeholder="Como aparece no cartão"
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition ${
                            errors.cardholderName
                              ? "border-red-500 focus:ring-red-500"
                              : "border-slate-300 focus:ring-indigo-500"
                          }`}
                          disabled={isProcessing}
                        />
                        {errors.cardholderName && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.cardholderName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Número do Cartão
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          maxLength="19"
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition font-mono ${
                            errors.cardNumber
                              ? "border-red-500 focus:ring-red-500"
                              : "border-slate-300 focus:ring-indigo-500"
                          }`}
                          disabled={isProcessing}
                        />
                        {errors.cardNumber && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.cardNumber}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Validade (MM/YY)
                          </label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            placeholder="12/25"
                            maxLength="5"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition font-mono ${
                              errors.expiryDate
                                ? "border-red-500 focus:ring-red-500"
                                : "border-slate-300 focus:ring-indigo-500"
                            }`}
                            disabled={isProcessing}
                          />
                          {errors.expiryDate && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.expiryDate}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            CVV
                          </label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="123"
                            maxLength="4"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition font-mono ${
                              errors.cvv
                                ? "border-red-500 focus:ring-red-500"
                                : "border-slate-300 focus:ring-indigo-500"
                            }`}
                            disabled={isProcessing}
                          />
                          {errors.cvv && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.cvv}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Seção: Endereço de Cobrança */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
                      Endereço de Cobrança
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Endereço
                        </label>
                        <input
                          type="text"
                          name="street"
                          value={formData.street}
                          onChange={handleInputChange}
                          placeholder="Rua, número e complemento"
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition ${
                            errors.street
                              ? "border-red-500 focus:ring-red-500"
                              : "border-slate-300 focus:ring-indigo-500"
                          }`}
                          disabled={isProcessing}
                        />
                        {errors.street && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.street}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Cidade
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="São Paulo"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition ${
                              errors.city
                                ? "border-red-500 focus:ring-red-500"
                                : "border-slate-300 focus:ring-indigo-500"
                            }`}
                            disabled={isProcessing}
                          />
                          {errors.city && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.city}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Estado
                          </label>
                          <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            placeholder="SP"
                            maxLength="2"
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                            disabled={isProcessing}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            CEP
                          </label>
                          <input
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            placeholder="01234-567"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition ${
                              errors.zipCode
                                ? "border-red-500 focus:ring-red-500"
                                : "border-slate-300 focus:ring-indigo-500"
                            }`}
                            disabled={isProcessing}
                          />
                          {errors.zipCode && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.zipCode}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            País
                          </label>
                          <input
                            type="text"
                            value="Brasil"
                            disabled
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-100 text-slate-600"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Botão de Submissão */}
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 disabled:opacity-60 disabled:cursor-not-allowed mt-8"
                  >
                    {isProcessing
                      ? "Processando Pagamento..."
                      : "Confirmar Pagamento"}
                  </button>

                  <p className="text-xs text-center text-slate-500">
                    Seu pagamento é processado de forma segura pelo Stripe
                  </p>
                </form>
              )}

              {/* Formulário de PIX */}
              {paymentMethod === "pix" && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <Lock size={20} className="text-green-600" />
                      Pagamento via PIX
                    </h3>
                    <p className="text-slate-600 mb-2">
                      Nenhuma conta necessária. Use seu app de banco para
                      escanear o QR code ou copiar a chave PIX.
                    </p>
                    <p className="text-sm text-green-600 font-medium">
                      ✓ Acesso gerado automaticamente após pagamento confirmado
                    </p>
                  </div>

                  {/* Campo de Email */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="seu@email.com"
                      required
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition ${
                        errors.email
                          ? "border-red-500 focus:ring-red-500"
                          : "border-slate-300 focus:ring-indigo-500"
                      }`}
                      disabled={isProcessing}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                    <p className="text-xs text-slate-500 mt-1">
                      Sua chave de acesso será enviada para este email
                    </p>
                  </div>

                  {/* QR Code Placeholder */}
                  <div className="bg-slate-50 rounded-xl p-8 border border-slate-200 flex flex-col items-center">
                    <div className="w-64 h-64 bg-white border-4 border-slate-300 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center">
                        <p className="text-slate-400 mb-2">QR Code</p>
                        <div className="grid grid-cols-8 gap-1">
                          {Array(64)
                            .fill(0)
                            .map((_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-2 rounded-sm ${
                                  Math.random() > 0.5
                                    ? "bg-slate-900"
                                    : "bg-white"
                                }`}
                              />
                            ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 text-center">
                      Escaneie este código com seu app de banco
                    </p>
                  </div>

                  {/* Chave PIX */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Chave PIX (Copia e Cola)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value="00020126580014br.gov.bcb.brcode01051.0.063047B48B1D28DA28B0F3D8DDB8ECC400530398265407681.005802BR5913CLOUDMAX6009SAO PAULO62410503***63047B48"
                        readOnly
                        className="flex-1 px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 font-mono text-xs text-slate-600"
                      />
                      <button
                        type="button"
                        onClick={handleCopyPixKey}
                        disabled={isProcessing}
                        className={`px-4 py-2 rounded-lg font-bold transition flex items-center gap-2 ${
                          pixKeyCopied
                            ? "bg-green-600 text-white"
                            : "bg-indigo-600 text-white hover:bg-indigo-700"
                        }`}
                      >
                        <Copy size={16} />
                        {pixKeyCopied ? "Copiado!" : "Copiar"}
                      </button>
                    </div>
                  </div>

                  {/* Informação de Valor */}
                  <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700 font-medium">
                        Valor a transferir:
                      </span>
                      <span className="text-2xl font-bold text-indigo-600">
                        R$ {planData?.pricing?.totalBilled || "0.00"}
                      </span>
                    </div>
                  </div>

                  {/* Instruções */}
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <h4 className="font-semibold text-amber-900 mb-2">
                      Como fazer o pagamento:
                    </h4>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-amber-800">
                      <li>Abra o seu app de banco</li>
                      <li>Escolha a opção "PIX"</li>
                      <li>Escaneie o QR code ou cole a chave PIX</li>
                      <li>Confirme o valor e dados do beneficiário</li>
                      <li>Finalize a transação</li>
                    </ol>
                  </div>

                  {/* Checkbox de Confirmação */}
                  <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <input
                      type="checkbox"
                      id="pix-confirmed"
                      disabled={isProcessing}
                      required
                      className="mt-1 rounded border-slate-300"
                    />
                    <label
                      htmlFor="pix-confirmed"
                      className="text-sm text-slate-600"
                    >
                      Confirmo que realizei a transferência PIX pelo valor
                      especificado acima
                    </label>
                  </div>

                  {/* Botão de Submissão */}
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 disabled:opacity-60 disabled:cursor-not-allowed mt-8"
                  >
                    {isProcessing
                      ? "Processando..."
                      : "Confirmar Pagamento via PIX"}
                  </button>

                  <p className="text-xs text-center text-slate-500">
                    O pagamento pode levar alguns minutos para ser confirmado
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Resumo do Pedido */}
          <div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-24">
              <h3 className="text-xl font-bold text-slate-900 mb-6">
                Resumo do Pedido
              </h3>

              {planData && (
                <div className="space-y-4 mb-6 pb-6 border-b border-slate-200">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Plano</span>
                    <span className="font-bold text-slate-900">
                      {planData.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Tamanho</span>
                    <span className="font-bold text-slate-900">
                      {planData.size}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Ciclo</span>
                    <span className="font-bold text-slate-900">
                      {planData.cycle}
                    </span>
                  </div>
                  {planData.pricing?.discountPercent > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Desconto</span>
                      <span className="font-bold">
                        -{planData.pricing.discountPercent}%
                      </span>
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="text-slate-600 font-medium">Total</span>
                <span className="text-3xl font-bold text-indigo-600">
                  R$ {planData?.pricing?.totalBilled || "0.00"}
                </span>
              </div>

              <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                <p className="text-xs text-indigo-700 text-center">
                  ✓ Pagamento seguro com SSL
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
