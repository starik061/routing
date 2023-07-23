import { Section, Container, CountryInfo, Loader, Heading } from 'components';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import { fetchCountry } from 'service/country-service';

export const Country = () => {
  const [country, setCountry] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { countryId } = useParams();
  const location = useLocation();

  const backHref = useRef(location.state?.from ?? '/');

  useEffect(() => {
    setIsLoading(true);
    const oneCountry = async () => {
      try {
        const responseCountry = await fetchCountry(countryId);
        setCountry(responseCountry);
      } catch (error) {
        setError(error.response.statusText);
      } finally {
        setIsLoading(false);
      }
    };
    oneCountry();
  }, [countryId]);
  const { flag, capital, countryName, id, languages, population } = country;
  return (
    <Section>
      <Link to={backHref.current}>On back</Link>
      <Container>
        {error ? (
          <Heading>{error}</Heading>
        ) : (
          <CountryInfo
            flag={flag}
            capital={capital}
            country={countryName}
            id={id}
            languages={languages}
            population={population}
          />
        )}
        {isLoading && <Loader />}
      </Container>
    </Section>
  );
};
