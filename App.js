import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  Switch,
  Pressable,
  Modal,
  Alert,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';

const NOTIFICACOES_ALEATORIAS = [
  'Lembrete: Hidrate-se! 💧',
  'Respire fundo e continue. 🌬️',
  'Dica: Faça uma pausa breve. ⏱️',
  'Mantenha o foco nos seus objetivos! 🚀',
  'Alongue o corpo e relaxe os ombros! 🧘',
];

export default function App() {
  // Estado da Bio
  const [bio, setBio] = useState('');
  const [tempBio, setTempBio] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // Estado das Notificações
  const [notificacoesAtivas, setNotificacoesAtivas] = useState(false);
  const [notificacaoAtual, setNotificacaoAtual] = useState('');

  // Temporizador para notificações a cada 5s quando ativo
  useEffect(() => {
    let intervalo = null;

    if (notificacoesAtivas) {
      const notifInicial =
        NOTIFICACOES_ALEATORIAS[
          Math.floor(Math.random() * NOTIFICACOES_ALEATORIAS.length)
        ];
      setNotificacaoAtual(notifInicial);

      intervalo = setInterval(() => {
        const proximaNotif =
          NOTIFICACOES_ALEATORIAS[
            Math.floor(Math.random() * NOTIFICACOES_ALEATORIAS.length)
          ];
        setNotificacaoAtual(proximaNotif);
      }, 5000);
    } else {
      setNotificacaoAtual('');
    }

    return () => {
      if (intervalo) clearInterval(intervalo);
    };
  }, [notificacoesAtivas]);

  // Ações do Modal de Bio
  const abrirModalBio = () => {
    setTempBio(bio);
    setModalVisible(true);
  };

  const salvarBio = () => {
    setBio(tempBio);
    setModalVisible(false);
    Alert.alert('Sucesso', 'Bio atualizada!');
  };

  const cancelarEdicaoBio = () => {
    setModalVisible(false);
  };

  // Botão Salvar Principal
  const handleSalvarGeral = () => {
    Alert.alert('Sucesso', 'Dados salvos com sucesso!');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Foto do Perfil carregando eu.jpg da pasta assets */}
        <Image
          source={require('./assets/eu.jpg')}
          style={styles.avatar}
          resizeMode="cover"
        />

        {/* Nome do Usuário */}
        <Text style={styles.nome}>Prof. Victor Vidigal Ribeiro</Text>

        {/* Seção Bio */}
        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Bio</Text>

          <View style={styles.bioBox}>
            <Text style={styles.bioTexto}>{bio}</Text>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.botaoAzulPequeno,
              pressed && styles.botaoPressionado,
            ]}
            onPress={abrirModalBio}
          >
            <Text style={styles.textoBotaoAzulPequeno}>Editar bio</Text>
          </Pressable>
        </View>

        {/* Seção Configurações */}
        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Configurações</Text>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Receber Notificações</Text>
            <Switch
              value={notificacoesAtivas}
              onValueChange={setNotificacoesAtivas}
              trackColor={{ false: '#e2e8f0', true: '#93c5fd' }}
              thumbColor={notificacoesAtivas ? '#2563eb' : '#f8fafc'}
            />
          </View>
        </View>

        {/* Botão Salvar Geral */}
        <Pressable
          style={({ pressed }) => [
            styles.botaoSalvarPrincipal,
            pressed && styles.botaoPressionado,
          ]}
          onPress={handleSalvarGeral}
        >
          <Text style={styles.textoBotaoSalvarPrincipal}>Salvar</Text>
        </Pressable>
      </ScrollView>

      {/* Barra de Notificação Inferior */}
      {notificacoesAtivas && notificacaoAtual !== '' && (
        <View style={styles.toastContainer}>
          <Text style={styles.toastTexto}>{notificacaoAtual}</Text>
        </View>
      )}

      {/* Modal Editar Bio */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={cancelarEdicaoBio}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitulo}>Editar Bio</Text>

            <TextInput
              style={styles.modalInput}
              multiline={true}
              numberOfLines={4}
              placeholder="Digite aqui sua bio..."
              placeholderTextColor="#9ca3af"
              value={tempBio}
              onChangeText={setTempBio}
              textAlignVertical="top"
            />

            <View style={styles.modalBotoesContainer}>
              <Pressable
                style={({ pressed }) => [
                  styles.modalBotaoCancelar,
                  pressed && styles.botaoPressionado,
                ]}
                onPress={cancelarEdicaoBio}
              >
                <Text style={styles.textoBotaoCancelar}>Cancelar</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.modalBotaoSalvar,
                  pressed && styles.botaoPressionado,
                ]}
                onPress={salvarBio}
              >
                <Text style={styles.textoBotaoSalvar}>Salvar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 90,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 16,
    backgroundColor: '#e5e7eb',
  },
  nome: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  cardTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  bioBox: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    minHeight: 110,
    padding: 12,
    marginBottom: 14,
    backgroundColor: '#ffffff',
  },
  bioTexto: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
  },
  botaoAzulPequeno: {
    backgroundColor: '#2563eb',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  textoBotaoAzulPequeno: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 16,
    color: '#1f2937',
  },
  botaoSalvarPrincipal: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 6,
    shadowColor: '#1d4ed8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  textoBotaoSalvarPrincipal: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  botaoPressionado: {
    opacity: 0.85,
  },
  toastContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#111827',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  toastTexto: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 14,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    height: 120,
    padding: 12,
    fontSize: 15,
    color: '#1f2937',
    marginBottom: 16,
  },
  modalBotoesContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  modalBotaoCancelar: {
    backgroundColor: '#e5e7eb',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  textoBotaoCancelar: {
    color: '#374151',
    fontWeight: '600',
    fontSize: 14,
  },
  modalBotaoSalvar: {
    backgroundColor: '#2563eb',
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 8,
  },
  textoBotaoSalvar: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
