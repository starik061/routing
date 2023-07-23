import { useEffect, useState } from 'react';
import {
  Container,
  SearchForm,
  Section,
  Heading,
  Loader,
  CountryList,
} from 'components';
import { fetchByRegion } from 'service/country-service';
import { useSearchParams } from 'react-router-dom';

export const CountrySearch = () => {
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const region = searchParams.get('region');
    if (!region) return;

    setIsLoading(true);

    const getCountries = async () => {
      try {
        const response = await fetchByRegion(region);

        setCountries(response);
      } catch (error) {
        setError(error.response.statusText);
      } finally {
        setIsLoading(false);
      }
    };

    getCountries();
  }, [searchParams]);

  return (
    <Section>
      <Container>
        <SearchForm onSubmit={setSearchParams} />
        {isLoading && <Loader />}
        {error && <Heading>{error}</Heading>}
        {countries.length > 0 && <CountryList countries={countries} />}
      </Container>
    </Section>
  );
};
