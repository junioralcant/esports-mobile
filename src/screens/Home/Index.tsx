import { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import logoImg from '../../assets/logo-nlw-esports.png';

import { GameCard, GameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';
import { Background } from '../../components/Background';

import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);

  const navigation = useNavigation();

  function handleOpenGame(item: GameCardProps) {
    navigation.navigate('game', {
      id: item.id,
      title: item.title,
      bannerUrl: item.bannerUrl,
    });
  }

  useEffect(() => {
    fetch('http://192.168.0.103:3333/games')
      .then((res) => res.json())
      .then((data) => setGames(data));
  }, []);

  return (
    <Background>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <SafeAreaView style={styles.container}>
          <Image source={logoImg} style={styles.logo} />

          <Heading
            title="Não encontrou seu duo?"
            subtitle="Selecione o game que deseja jogar..."
          />

          <FlatList
            data={games}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <GameCard
                data={item}
                onPress={() => handleOpenGame(item)}
              />
            )}
            horizontal
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentList}
          />
        </SafeAreaView>
      </ScrollView>
    </Background>
  );
}
