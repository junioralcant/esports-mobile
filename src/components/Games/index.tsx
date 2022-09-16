import { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';

import { GameParams } from '../../@types/navigation';

import logoImg from '../../assets/logo-nlw-esports.png';
import { Background } from '../Background';

import { styles } from './styles';
import { THEME } from '../../theme';

import { Heading } from '../Heading';
import { DuoCard } from '../DuoCard';
import { DuoCardProps } from '../DuoCard/index';
import { DuoMatch } from '../DuoMatch';

export function Games() {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState('');

  const route = useRoute();
  const game = route.params as GameParams;

  const navigation = useNavigation();

  useEffect(() => {
    fetch(`http://192.168.0.103:3333/games/${game.id}/ads`)
      .then((res) => res.json())
      .then((data) => setDuos(data));
  }, []);

  function handleGoBack() {
    navigation.goBack();
  }

  async function getDiscordUser(adsId: string) {
    fetch(`http://192.168.0.103:3333/games/${adsId}/discord`)
      .then((res) => res.json())
      .then((data) => {
        setDiscordDuoSelected(data.discord);
      });
  }

  return (
    <Background>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleGoBack}>
              <Entypo
                name="chevron-thin-left"
                color={THEME.COLORS.CAPTION_300}
              />
            </TouchableOpacity>

            <Image source={logoImg} style={styles.logo} />

            <View style={styles.right} />
          </View>

          <Image
            source={{ uri: game.bannerUrl }}
            style={styles.cover}
            resizeMode="cover"
          />

          <Heading
            title={game.title}
            subtitle="Conecte-se e comece a jogar"
          />

          <FlatList
            data={duos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <DuoCard
                data={item}
                onConnect={() => getDiscordUser(item.id)}
              />
            )}
            style={styles.containerList}
            contentContainerStyle={[
              duos.length > 0
                ? styles.contentList
                : styles.emptyListContent,
            ]}
            showsVerticalScrollIndicator={false}
            horizontal
            ListEmptyComponent={() => (
              <Text style={styles.emptyListText}>
                Não há anuncios publicados ainda.
              </Text>
            )}
          />

          <DuoMatch
            discord={discordDuoSelected}
            visible={discordDuoSelected.length > 0}
            onClose={() => setDiscordDuoSelected('')}
          />
        </SafeAreaView>
      </ScrollView>
    </Background>
  );
}
