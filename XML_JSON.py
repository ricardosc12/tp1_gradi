import json
import xml.etree.ElementTree as ET

def json_to_xml(json_data):
    root = ET.Element("root")
    json_to_xml_recursive(root, json_data)
    return ET.ElementTree(root)

def json_to_xml_recursive(element, json_data):
    for key, value in json_data.items():
        subelement = ET.SubElement(element, key)
        if isinstance(value, dict):
            json_to_xml_recursive(subelement, value)
        else:
            subelement.text = str(value)


def converter_json_para_xml(nome_arquivo_json, nome_arquivo_xml):
    try:
        with open(nome_arquivo_json, 'r') as arquivo_json:
            dados_json = json.load(arquivo_json)

        tree = json_to_xml(dados_json)

        with open(nome_arquivo_xml, 'wb') as arquivo_xml:
            tree.write(arquivo_xml, encoding='utf-8', xml_declaration=True)

        print(f'O arquivo JSON "{nome_arquivo_json}" foi convertido e salvo como "{nome_arquivo_xml}" em formato XML.')
    except Exception as e:
        print(f'Ocorreu um erro: {str(e)}')


# Nome do arquivo JSON de entrada e do arquivo XML de saída
arquivo_json_entrada = 'dados.json'
arquivo_xml_saida = 'dados.xml'

converter_json_para_xml(arquivo_json_entrada, arquivo_xml_saida)


def xml_to_json(xml_data):
    root = xml_data.getroot()
    return xml_to_json_recursive(root)

def xml_to_json_recursive(element):
    json_data = {}
    for child in element:
        if child:
            if child.tag in json_data:
                if isinstance(json_data[child.tag], list):
                    json_data[child.tag].append(xml_to_json_recursive(child))
                else:
                    json_data[child.tag] = [json_data[child.tag], xml_to_json_recursive(child)]
            else:
                json_data[child.tag] = xml_to_json_recursive(child)
        else:
            return child.text
    return json_data

def converter_xml_para_json(nome_arquivo_xml, nome_arquivo_json):
    try:
        tree = ET.parse(nome_arquivo_xml)
        json_data = xml_to_json(tree)

        with open(nome_arquivo_json, 'w') as arquivo_json:
            json.dump(json_data, arquivo_json, indent=4)

        print(f'O arquivo XML "{nome_arquivo_xml}" foi convertido e salvo como "{nome_arquivo_json}" em formato JSON.')
    except Exception as e:
        print(f'Ocorreu um erro: {str(e)}')

# Nome do arquivo XML de entrada e do arquivo JSON de saída
arquivo_xml_entrada = 'dados.xml'
arquivo_json_saida = 'dados.json'

converter_xml_para_json(arquivo_xml_entrada, arquivo_json_saida)
