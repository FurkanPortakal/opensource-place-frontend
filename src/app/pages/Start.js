/* eslint-disable */
import React, { useState } from 'react'
import { NavBar } from '../components'
import axios from 'axios'
import { MainContainer, Containerx } from './style'
import styled from 'styled-components'
import { computer } from '../assets'

const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 3rem;
  padding: 1rem;
`

const ContentTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  @media screen and (max-width: 768px) {
    margin-top: 2rem;
  }
`

const HeroTitle = styled.h1`
  font-size: 3rem;
  background: -webkit-linear-gradient(
    331deg,
    rgba(168, 169, 61, 1) 0%,
    rgba(84, 172, 152, 1) 73%,
    rgba(99, 208, 171, 1) 100%
  );
  font-weight: 600;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media screen and (max-width: 768px) {
    font-size: 2rem;
  }
`
const HeroTitleContent = styled.p`
  display: flex;
  font-size: 1.1rem;
  line-height: 1.4;
  color: rgba(20, 120, 102, 60%);
`
const ContentBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 2rem;

  @media screen and (max-width: 768px) {
    margin-top: 1rem;
  }
`
const CustomButton = styled.button`
  margin-top: 2rem;
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  border: none;
  font-size: 24px;
  background-color: #63d0ab;
  color: #fff;
  transition: all 0.15s;
  &:hover {
    background-color: #54ac8d;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 1rem;
  }
`

const Input = styled.input`
  width: 60%;
  background-color: #fff;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #63d0ab;
  -webkit-transition: all 0.15s;
  transition: all 0.15s;
  color: #209c85;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #ccc;
  }
`
const HeroTitleContentContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 4rem 0 2rem 0;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`

const HeroTitleContentRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1rem;
  width: 60%;
  text-align: center;

  @media screen and (max-width: 768px) {
    align-items: center;
    justify-content: center;
    margin: 0;
    width: 100%;
  }
`

const HeroTitleContentLeft = styled.div`
  display: flex;
  width: 40%;

  @media screen and (max-width: 768px) {
    align-items: center;
    justify-content: center;
    margin: 0;
    width: 100%;
  }
`

const Start = () => {
  const [issue, setIssue] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)
  const [succes, setSucces] = useState(null)

  const addIssue = async (e) => {
    const url = process.env.REACT_APP_API_URL
    setErrors(null)
    setLoading(true)
    await axios
      .post(`${url}/repository`, {
        url: issue
      })
      .then(() => {
        setLoading(false)
        window.location.reload(true)
        setSucces(true)
      })
      .catch((err) => {
        setErrors('Please fill the empty fields or fill with a valid URL')
        setIssue('')
        setLoading(false)
        console.log({ ...err })
      })
    setIssue('')
    setLoading(false)
  }

  return (
    <>
      <NavBar />
      <Containerx>
        <MainContainer>
          <Background>
            <ContentTop>
              <HeroTitle>HOW SHOULD YOU ADD THE PROJECT</HeroTitle>
            </ContentTop>
            <HeroTitleContentContainer>
              <HeroTitleContentLeft>
                <img src={computer} width="auto" height="250" />
              </HeroTitleContentLeft>
              <HeroTitleContentRight>
                <HeroTitleContent>👇 Our recommended repository should be</HeroTitleContent>
                <HeroTitleContent>🛸 Must have a repository README.md</HeroTitleContent>
                <HeroTitleContent>🛸 Issues should be opened and labeled</HeroTitleContent>
                <HeroTitleContent>
                  🛸The url of the Github repository must be added from below
                </HeroTitleContent>
              </HeroTitleContentRight>
            </HeroTitleContentContainer>
            <ContentBottom>
              {loading ? (
                <ContentBottom>
                  <p>Loading</p>
                </ContentBottom>
              ) : (
                <ContentBottom>
                  <Input
                    type="text"
                    onChange={(e) => setIssue(e.target.value)}
                    value={issue}
                    placeholder="GitHub Repository URL (https://github.com/opensource-place/frontend)"
                  />
                  <CustomButton onClick={addIssue} type="Submit">
                    Add Project
                  </CustomButton>
                </ContentBottom>
              )}
              {errors ? (
                <p
                  style={{
                    padding: '1rem',
                    backgroundColor: '#FFF3CD',
                    color: '#CAB064',
                    borderRadius: '8px',
                    fontWeight: '600',
                    marginTop: '12px'
                  }}
                >
                  {errors}
                </p>
              ) : succes ? (
                <p
                  style={{
                    padding: '1rem',
                    backgroundColor: '#9bd888',
                    color: '#67bf4a',
                    borderRadius: '8px',
                    fontWeight: '600',
                    marginTop: '12px'
                  }}
                >
                  You can see your added project on the project page.
                </p>
              ) : (
                ''
              )}
            </ContentBottom>
          </Background>
        </MainContainer>
      </Containerx>
    </>
  )
}

export default Start
